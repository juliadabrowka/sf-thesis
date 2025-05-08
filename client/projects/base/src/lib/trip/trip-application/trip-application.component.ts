import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AutosaveRequestDTO,
  SfIconAndTextComponent,
  SfIcons,
  Status,
  SurveyAnswerDTO,
  SurveyQuestionDTO,
  TripApplicationDTO,
} from '@sf/sf-base';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { TripApplicationService } from 'projects/base/src/services/trip-application-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'sf-trip-application',
  imports: [
    NzEmptyComponent,
    PageTitleFramedComponent,
    NzInputDirective,
    FormsModule,
    NzButtonComponent,
    NzTooltipDirective,
    SfIconAndTextComponent,
  ],
  templateUrl: './trip-application.component.html',
  styleUrl: './trip-application.component.css',
})
export class SfTripApplicationComponent {
  private readonly messageService = inject(NzMessageService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly icons = SfIcons;

  public readonly sfTripApplication = input(undefined, {
    transform: (tripApplication: TripApplicationDTO | null | undefined) => {
      if (tripApplication) {
        this.assignTripApplicationData(tripApplication);
        this.ensureSurveyResponse(tripApplication);
      }

      return tripApplication ?? undefined;
    },
  });

  public readonly sfShowSubmitButton = input<boolean | null | undefined>();

  public readonly showSubmitButton = computed(() => this.sfShowSubmitButton());
  public readonly isSubmitted = computed(
    () => this.sfTripApplication()?.Status === Status.Completed,
  );

  public readonly title = signal('');
  public readonly articleImgSrc = signal('');
  public readonly extraLogoSrc = signal('');
  public readonly surveyQuestions = signal<SurveyQuestionDTO[]>([]);
  public readonly responses = signal<Record<string, SurveyAnswerDTO>>({});

  private autosaveTrigger$ = new Subject<void>();

  constructor(private tripService: TripApplicationService) {
    this.autosaveTrigger$
      .pipe(debounceTime(1000))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.autosaveApplication();
        this.messageService.info('Ankieta została automatycznie zapisana');
      });
  }

  onAnswerChange(question: SurveyQuestionDTO, answer: string): void {
    const app = this.sfTripApplication();
    if (!app) return;

    const response = app.SurveyResponseDTO;
    const existing = response?.SurveyAnswerDTOS.find(
      (a) => a.SurveyQuestionId === question.Id,
    );

    if (existing) {
      existing.Answer = answer;
    } else {
      const newAnswer: SurveyAnswerDTO = {
        Id: undefined,
        Answer: answer,
        SurveyQuestionId: question.Id,
        SurveyQuestionDTO: question,
        SurveyResponseId: undefined,
        SurveyResponseDTO: undefined,
      };
      response?.SurveyAnswerDTOS.push(newAnswer);
    }

    const current = this.responses();
    this.responses.set({
      ...current,
      [question.Id ?? -1]: {
        ...current[question.Id ?? -1],
        Answer: answer,
        SurveyQuestionId: question.Id,
        SurveyQuestionDTO: question,
      },
    });

    this.autosaveTrigger$.next();
  }

  private autosaveApplication() {
    const tripApplication = this.sfTripApplication();
    if (!tripApplication) {
      throw new Error('Trip Application Not Found!!');
    }

    if (!tripApplication.Id) {
      throw new Error('Trip Application ID Not Found!!');
    }

    const payload: AutosaveRequestDTO = {
      TripApplicationId: tripApplication.Id,
      Responses: this.responses(),
    };

    this.tripService
      .autosaveApplication(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => console.log('Autosave success'),
        error: (err) => console.error('Autosave failed', err),
      });
  }

  onSubmit() {
    const tripApplication = this.sfTripApplication();
    if (!tripApplication) {
      throw new Error('Trip Application Not Found!!');
    }

    if (!tripApplication.Id) {
      throw new Error('Trip Application ID Not Found!!');
    }

    const payload: AutosaveRequestDTO = {
      TripApplicationId: tripApplication.Id,
      Responses: this.responses(),
    };

    this.tripService
      .submitApplication(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => console.log('Submit success'),
        error: (err) => console.error('Submit failed', err),
      });
  }

  private ensureSurveyResponse(app: TripApplicationDTO): void {
    if (!app.SurveyResponseDTO) {
      app.SurveyResponseDTO = {
        Id: undefined,
        RepliedOn: new Date(),
        TripApplicationId: app.Id,
        TripApplicationDTO: app,
        SurveyAnswerIds: [],
        SurveyAnswerDTOS: [],
      };
    }
  }

  private assignTripApplicationData(tripApplication: TripApplicationDTO) {
    const title = tripApplication?.TripDTO?.ArticleDTO?.Title ?? '';
    this.title.set(title);

    const articleSrc =
      tripApplication?.TripDTO?.ArticleDTO?.BackgroundImageUrl ?? '';
    this.articleImgSrc.set(articleSrc);

    const extraLogoSrc =
      tripApplication?.TripDTO?.SurveyDTO?.ExtraLogoUrl ?? '';
    this.extraLogoSrc.set(extraLogoSrc);

    const surveyQuestions =
      tripApplication?.TripDTO?.SurveyDTO?.SurveyQuestionDTOS ?? [];
    this.surveyQuestions.set(surveyQuestions);

    const surveyResponse = tripApplication.SurveyResponseDTO;
    const surveyResponseAnswers = surveyResponse?.SurveyAnswerDTOS ?? [];

    const responseMap: Record<string, SurveyAnswerDTO> = {};
    for (const answer of surveyResponseAnswers) {
      if (answer?.SurveyQuestionId) {
        responseMap[answer.SurveyQuestionId] = answer;
      }
    }
    this.responses.set(responseMap);
  }
}
