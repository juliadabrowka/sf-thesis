import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { PageTitleFramedComponent } from '../page-title-framed/page-title-framed.component';
import { SurveyDTO, SurveyQuestionDTO, SurveyStore } from '@sf/sf-base';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'sf-survey',
  imports: [PageTitleFramedComponent, NzEmptyComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyComponent {
  private readonly surveyStore = inject(SurveyStore);

  public readonly sfSurvey = input<SurveyDTO | null | undefined>(undefined);
  public responses = signal<
    {
      question: SurveyQuestionDTO | undefined;
      answer: string;
    }[]
  >([]);

  public readonly survey = computed(() => this.surveyStore.survey());
  public readonly title = computed(
    () => this.survey()?.TripDTOS[0]?.ArticleDTO?.Title,
  );
  public readonly articleImgSrc = computed(
    () => this.survey()?.TripDTOS[0]?.ArticleDTO,
  );

  constructor() {
    effect(() => {
      // const responseArray =
      //   tripApplication?.SurveyResponseDTO?.SurveyAnswerDTOS?.map(
      //     (surveyAnswer) => ({
      //       question: surveyAnswer.SurveyQuestionDTO,
      //       answer: surveyAnswer.Answer,
      //     }),
      //   ) ?? [];
      //
      // this.responses.set(responseArray);
    });
  }
}
