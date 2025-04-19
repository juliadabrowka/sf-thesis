import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyDTO, SurveyQuestionDTO, TripDTO } from '../../data-types';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { SfIconAndTextComponent } from '../icon-and-text/icon-and-text.component';
import { SfIcons } from '../icons';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { SurveyService } from '../../services/survey.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { ArticleStore } from '../../state/article-store';
import { SurveyStore } from '../../state/survey-store';
import { isNil } from '@w11k/rx-ninja';

@Component({
  selector: 'sf-survey',
  imports: [
    SurveyCreatorModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    SfIconAndTextComponent,
    NzFormDirective,
    NzCardComponent,
    FormsModule,
    CdkDragHandle,
    FaIconComponent,
    NzTooltipDirective,
    NzEmptyComponent,
    NzSelectComponent,
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyComponent {
  private readonly surveyService = inject(SurveyService);
  private readonly articleStore = inject(ArticleStore);
  private readonly surveyStore = inject(SurveyStore);

  public readonly sfTrips = input([], {
    transform: (trips: TripDTO[] | null | undefined) => trips ?? [],
  });
  public readonly sfSurvey = input(undefined, {
    transform: (survey: SurveyDTO | null | undefined) => survey ?? undefined,
  });

  public readonly __icons = SfIcons;
  public readonly __questionsArray = new FormArray<FormControl<string>>([], {
    validators: Validators.required,
  });

  public __surveyQuestions: SurveyQuestionDTO[] = [];
  public readonly __controls = {
    title: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    trip: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    question: new FormControl<string | null>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    questions: new FormControl<SurveyQuestionDTO[]>([], {
      validators: Validators.required,
      nonNullable: true,
    }),
  };

  public readonly __formGroup = new FormGroup({
    ...this.__controls,
    questionsArray: this.__questionsArray,
  });

  public __tripOptions: { label: string; value: string }[] = [];
  private tripId: number | undefined;
  private trip: TripDTO | undefined;
  public editingIndex: number | undefined;

  constructor() {
    toObservable(this.sfTrips)
      .pipe(takeUntilDestroyed())
      .subscribe(
        (trips) =>
          (this.__tripOptions = trips.map((trip) => ({
            label: trip?.Name ?? '',
            value: (trip.Id ?? 0).toString(),
          }))),
      );

    this.__formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      const survey = this.sfSurvey();
      const surveyState = isNil(survey) ? new SurveyDTO() : survey;

      const questions = this.__questionsArray.controls.map((ctrl) => {
        const dto = new SurveyQuestionDTO();
        dto.Question = ctrl.value;
        return dto;
      });

      surveyState.TripDto = this.trip;
      surveyState.TripId = this.tripId;
      surveyState.SurveyQuestionDtos = questions;
      surveyState.Title = this.__controls.title.value;
      surveyState.SurveyQuestionIds = questions
        .map((q) => q.Id)
        .filter((id): id is number => id !== undefined);

      this.surveyStore.setSurvey(surveyState);
    });

    this.__controls.trip.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((tripId) => {
        this.tripId = tripId ? parseInt(tripId) : undefined;
        this.trip = this.articleStore
          .articles()
          .find((a) => a.TripDto?.Id === this.tripId)?.TripDto;
      });
  }

  addQuestion(): void {
    const q = this.__controls.question.value?.trim();
    if (!q) return;

    this.__questionsArray.push(
      new FormControl(q, {
        validators: Validators.required,
        nonNullable: true,
      }),
    );

    this.__controls.question.reset();
  }

  removeQuestion(i: number): void {
    if (i === undefined) {
      throw new Error('Question id is required');
    }
    this.__surveyQuestions = this.__surveyQuestions.filter(
      (_, index) => index !== i,
    );

    this.__questionsArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<FormControl<string>[]>): void {
    moveItemInArray(
      this.__questionsArray.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }

  startEditing(index: number): void {
    this.editingIndex = index;
  }

  saveEdit(index: number): void {
    const control = this.__questionsArray.at(index);
    const newValue = control.value.trim();

    if (newValue) {
      const question = this.__surveyQuestions[index];
      if (question) {
        question.Question = newValue;
        control.setValue(newValue);
      }
    }

    this.editingIndex = undefined;
  }

  cancelEdit(): void {
    this.editingIndex = undefined;
  }
}
