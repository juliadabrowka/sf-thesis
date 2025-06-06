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
import { TripApplicationStore } from '../../../state/trip-application-store';

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
  providers: [TripApplicationStore],
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
        this.internalTripApplication.set(tripApplication);
      }

      return tripApplication ?? undefined;
    },
  });
  public readonly sfReadonlyMode = input(false, {
    transform: (readonly: boolean | null | undefined) => readonly,
  });
  public readonly internalTripApplication = signal<
    TripApplicationDTO | undefined
  >(undefined);

  public readonly sfShowSubmitButton = input<boolean | null | undefined>();

  public readonly isSubmittedComputed = computed(
    () => this.internalTripApplication()?.Status === Status.Completed,
  );

  public readonly title = computed(
    () => this.sfTripApplication()?.TripDTO?.ArticleDTO?.Title,
  );
  public readonly articleImgSrc = computed(
    () =>
      this.sfTripApplication()?.TripDTO?.ArticleDTO?.BackgroundImageUrl ?? '',
  );
  public readonly extraLogoSrc = computed(
    () => this.sfTripApplication()?.TripDTO?.SurveyDTO?.ExtraLogoUrl ?? '',
  );
  public readonly surveyQuestions = computed(
    () =>
      this.sfTripApplication()?.TripDTO?.SurveyDTO?.SurveyQuestionDTOS ?? [],
  );
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
        next: (res) => {
          console.log('Submit success');
          const updated = {
            ...tripApplication,
            Status: Status.Completed,
          };
          this.internalTripApplication.set(updated);
        },
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
    const surveyResponse = tripApplication.SurveyResponseDTO;
    const surveyResponseAnswers = surveyResponse?.SurveyAnswerDTOS ?? [];

    const responseMap: Record<string, SurveyAnswerDTO> = {};
    for (const answer of surveyResponseAnswers) {
      if (answer?.SurveyQuestionId) {
        responseMap[answer.SurveyQuestionId] = answer;
      }
    }
    console.log(responseMap);
    this.responses.set(responseMap);
  }
}
