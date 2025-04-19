import { Component, inject } from '@angular/core';
import {
  ArticleStore,
  SfButtonComponent,
  SfSurveyComponent,
  SurveyStore,
} from '@sf/sf-base';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-backoffice-survey-view',
  imports: [SfSurveyComponent, SfButtonComponent],
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.css',
})
export class SfBackofficeSurveyViewComponent {
  private readonly articleStore = inject(ArticleStore);
  private readonly surveyStore = inject(SurveyStore);
  private readonly msg = inject(NzMessageService);

  public __trips = this.articleStore.trips;
  public __survey = this.surveyStore.survey;

  public async __createSurvey() {
    const survey = this.__survey();
    if (survey) {
      await this.surveyStore.createSurvey(survey);
    }
  }
}
