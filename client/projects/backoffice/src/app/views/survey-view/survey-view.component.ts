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
  private readonly __articleStore = inject(ArticleStore);
  private readonly __surveyStore = inject(SurveyStore);
  private readonly __messageService = inject(NzMessageService);

  public readonly trips = this.__articleStore.trips;
  public readonly survey = this.__surveyStore.survey;

  public async __createSurvey() {
    const survey = this.survey();
    if (survey) {
      await this.__surveyStore.createSurvey(survey);
    }
  }
}
