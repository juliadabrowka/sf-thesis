import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly __articleStore = inject(ArticleStore);
  private readonly __surveyStore = inject(SurveyStore);

  public readonly sfTrips = input([], {
    transform: (trips: TripDTO[] | null | undefined) => trips ?? [],
  });
  public readonly sfSurvey = input(undefined, {
    transform: (survey: SurveyDTO | null | undefined) => survey ?? undefined,
  });

  public readonly icons = SfIcons;
  public readonly questionsArray = new FormArray<FormControl<string>>([], {
    validators: Validators.required,
  });
  public readonly controls = {
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
  public readonly formGroup = new FormGroup({
    ...this.controls,
    questionsArray: this.questionsArray,
  });
  public readonly surveyQuestions = signal<SurveyQuestionDTO[]>([]);
  public readonly editingIndex = signal<number | undefined>(undefined);
  public readonly tripOptions = signal<{ label: string; value: string }[]>([]);

  private readonly __tripId = signal<number | undefined>(undefined);
  private readonly __trip = signal<TripDTO | undefined>(undefined);

  constructor() {
    effect(() => {
      const trips = this.sfTrips();

      const tripOpts = trips.map((trip) => ({
        label: trip?.Name ?? '',
        value: (trip.Id ?? 0).toString(),
      }));

      this.tripOptions.set(tripOpts);
    });

    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      const survey = this.sfSurvey();
      const surveyState = isNil(survey) ? new SurveyDTO() : survey;

      const questions = this.questionsArray.controls.map((ctrl) => {
        const dto = new SurveyQuestionDTO();
        dto.Question = ctrl.value;
        return dto;
      });

      surveyState.TripDto = this.__trip();
      surveyState.TripId = this.__tripId();
      surveyState.SurveyQuestionDtos = questions;
      surveyState.Title = this.controls.title.value;
      surveyState.SurveyQuestionIds = questions
        .map((q) => q.Id)
        .filter((id): id is number => id !== undefined);

      this.__surveyStore.setSurvey(surveyState);
    });

    this.controls.trip.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((tripId) => {
        this.__tripId.set(tripId ? parseInt(tripId) : undefined);
        this.__trip.set(
          this.__articleStore
            .articles()
            .find((a) => a.TripDto?.Id === this.__tripId())?.TripDto,
        );
      });
  }

  addQuestion(): void {
    const q = this.controls.question.value?.trim();
    if (!q) return;

    this.questionsArray.push(
      new FormControl(q, {
        validators: Validators.required,
        nonNullable: true,
      }),
    );

    this.controls.question.reset();
  }

  removeQuestion(i: number): void {
    if (i === undefined) {
      throw new Error('Question id is required');
    }
    const sq = this.surveyQuestions().filter((_, index) => index !== i);

    this.surveyQuestions.set(sq);
    this.questionsArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<FormControl<string>[]>): void {
    moveItemInArray(
      this.questionsArray.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }

  startEditing(index: number): void {
    this.editingIndex.set(index);
  }

  saveEdit(index: number): void {
    const control = this.questionsArray.at(index);
    const newValue = control.value.trim();

    if (newValue) {
      const question = this.surveyQuestions()[index];
      if (question) {
        question.Question = newValue;
        control.setValue(newValue);
      }
    }

    this.editingIndex.set(undefined);
  }

  cancelEdit(): void {
    this.editingIndex.set(undefined);
  }
}
