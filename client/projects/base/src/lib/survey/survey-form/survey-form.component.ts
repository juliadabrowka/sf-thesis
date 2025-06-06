import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyDTO, SurveyQuestionDTO, TripDTO } from '../../../data-types';
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
import { SfIconAndTextComponent } from '../../icon-and-text/icon-and-text.component';
import { SfIcons } from '../../icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { SurveyStore } from '../../../state/survey-store';
import { isNil } from '@w11k/rx-ninja';
import { SfUploadComponent } from '../../upload/upload.component';
import { map } from 'rxjs';

@Component({
  selector: 'sf-survey-form',
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
    FormsModule,
    CdkDragHandle,
    FaIconComponent,
    NzTooltipDirective,
    NzEmptyComponent,
    NzSelectComponent,
    SfUploadComponent,
  ],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyFormComponent {
  private readonly __surveyStore = inject(SurveyStore);

  public readonly sfTrips = input<TripDTO[] | null | undefined>();
  public readonly sfSurvey = input(undefined, {
    transform: (survey: SurveyDTO | null | undefined) => survey ?? undefined,
  });
  public readonly icons = SfIcons;
  public readonly questionsArray = new FormArray<
    FormControl<SurveyQuestionDTO>
  >([], {
    validators: Validators.required,
  });
  public readonly controls = {
    title: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    tripIds: new FormControl<string[]>([], {
      validators: Validators.required,
      nonNullable: true,
    }),
    question: new FormControl<string | null>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    extraLogo: new FormControl<string>('', {
      nonNullable: true,
    }),
  };
  public readonly formGroup = new FormGroup({
    ...this.controls,
    questionsArray: this.questionsArray,
  });
  public readonly editingIndex = signal<number | undefined>(undefined);
  public readonly tripOptions = signal<{ label: string; value: string }[]>([]);

  constructor() {
    effect(() => {
      const survey = this.sfSurvey();

      const addQuestions = (
        surveyQuestions: SurveyQuestionDTO[] | undefined,
      ) => {
        if (surveyQuestions) {
          this.questionsArray.clear();
          for (const q of surveyQuestions) {
            this.questionsArray.push(
              new FormControl(q, {
                validators: Validators.required,
                nonNullable: true,
              }),
            );
          }
        } else {
          this.__createQuestion('Ile masz lat?'),
            this.__createQuestion('Gdzie mieszkasz?');
        }

        return this.questionsArray.controls.map((q) => q.value);
      };

      this.formGroup.patchValue({
        title: survey?.Title ?? '',
        tripIds: survey?.TripIds?.map((id) => id.toString()) ?? [],
        extraLogo: survey?.ExtraLogoUrl ?? '',
        questionsArray: addQuestions(survey?.SurveyQuestionDTOS),
      });
    });

    effect(() => {
      const trips = this.sfTrips() ?? [];

      const tripOpts = trips.map((trip) => ({
        label: trip?.Name ?? '',
        value: (trip.Id ?? 0).toString(),
      }));

      this.tripOptions.set(tripOpts);
    });

    this.formGroup.valueChanges
      .pipe(
        map(() => this.formGroup.getRawValue()),
        takeUntilDestroyed(),
      )
      .subscribe((fg) => {
        const survey = this.sfSurvey();
        const surveyState = isNil(survey) ? new SurveyDTO() : survey;
        const tripIds = fg.tripIds.map((id) => parseInt(id));

        surveyState.TripIds = tripIds;
        surveyState.SurveyQuestionDTOS = fg.questionsArray;
        surveyState.Title = fg.title;
        surveyState.ExtraLogoUrl = fg.extraLogo;
        surveyState.SurveyQuestionIds = fg.questionsArray
          .map((q) => q.Id)
          .filter((id): id is number => id !== undefined);

        if (surveyChanged(survey, surveyState)) {
          this.__surveyStore.setSurvey(surveyState);
        }
      });
  }

  private __createQuestion(question: string) {
    const surveyQuestion: SurveyQuestionDTO = {
      Id: undefined,
      Question: question,
      IsCommon: false,
      SurveyIds: [],
      SurveyDTOS: [],
      SurveyAnswerDTOS: [],
      SurveyAnswerIds: [],
    };

    this.questionsArray.push(
      new FormControl(surveyQuestion, {
        validators: Validators.required,
        nonNullable: true,
      }),
    );
  }

  addQuestion(): void {
    const q = this.controls.question.value?.trim();
    if (!q) return;
    this.__createQuestion(q);
    this.controls.question.reset();
  }

  removeQuestion(i: number): void {
    if (i === undefined) {
      throw new Error('Question id is required');
    }

    this.questionsArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<FormControl<string>[]>): void {
    moveItemInArray(
      this.questionsArray.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }

  saveEdit(index: number): void {
    const control = this.questionsArray.at(index);
    const newValue = control.value.Question;

    if (newValue) {
      control.setValue({
        ...control.value,
        Question: newValue,
      });
    }

    this.editingIndex.set(undefined);
  }
  startEditing(index: number): void {
    this.editingIndex.set(index);
  }

  cancelEdit(): void {
    this.editingIndex.set(undefined);
  }

  uploadedLogo(imgUrl: string) {
    this.controls.extraLogo.patchValue(imgUrl);
  }

  setQuestionArray($index: number, $event: any) {
    return this.questionsArray
      .at($index)
      .setValue({ ...this.questionsArray.at($index).value, Question: $event });
  }
}

export function surveyChanged(prev: SurveyDTO | undefined, current: SurveyDTO) {
  if (!prev) return true;

  const arraysEqual = (a: number[], b: number[]): boolean => {
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
  };

  const questionsEqual = (
    a: SurveyQuestionDTO[],
    b: SurveyQuestionDTO[],
  ): boolean => {
    if (a.length !== b.length) return false;
    return a.every((q, i) => q.Question === b[i].Question && q.Id === b[i].Id);
  };

  return (
    prev.Id !== current.Id ||
    prev.Title !== current.Title ||
    prev.ExtraLogoUrl !== current.ExtraLogoUrl ||
    !arraysEqual(prev.TripIds, current.TripIds) ||
    !questionsEqual(prev.SurveyQuestionDTOS, current.SurveyQuestionDTOS) ||
    !arraysEqual(prev.SurveyQuestionIds, current.SurveyQuestionIds) ||
    current.SurveyQuestionDTOS.some((q) => !q.Id)
  );
}
