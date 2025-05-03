import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PageTitleFramedComponent } from '../page-title-framed/page-title-framed.component';
import { ActivatedRoute } from '@angular/router';
import { SurveyDTO, SurveyStore } from '@sf/sf-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-survey',
  imports: [PageTitleFramedComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly surveyStore = inject(SurveyStore);

  public readonly survey = signal<SurveyDTO | undefined>(undefined);
  public readonly title = signal('');
  public readonly articleImgSrc = signal('');

  private readonly __survey = this.surveyStore.survey;

  constructor() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        const hash = params.get('hash') as string;
        await this.surveyStore.getSurveyByHash(hash);
      });

    effect(() => {
      const survey = this.__survey();

      this.survey.set(survey);

      const title = survey?.TripDTOS[0]?.ArticleDTO?.Title ?? '';
      this.title.set(title);

      const article = survey?.TripDTOS[0]?.ArticleDTO;
      this.articleImgSrc.set(article?.BackgroundImageUrl ?? '');
    });
  }
}
