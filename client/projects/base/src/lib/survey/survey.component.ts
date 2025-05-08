import {
  ChangeDetectionStrategy,
  Component,
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

  public readonly sfSurvey = input(undefined, {
    transform: (survey: SurveyDTO | null | undefined) => survey ?? undefined,
  });

  public readonly survey = signal<SurveyDTO | undefined>(undefined);
  public readonly title = signal('');
  public readonly articleImgSrc = signal('');
  public responses = signal<
    {
      question: SurveyQuestionDTO | undefined;
      answer: string;
    }[]
  >([]);

  private readonly __survey = this.surveyStore.survey;

  constructor() {
    effect(() => {
      const survey = this.__survey();

      this.survey.set(survey);

      const title = survey?.TripDTOS[0]?.ArticleDTO?.Title ?? '';
      this.title.set(title);

      const article = survey?.TripDTOS[0]?.ArticleDTO;
      this.articleImgSrc.set(article?.BackgroundImageUrl ?? '');

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
