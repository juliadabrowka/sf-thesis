import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ArticleStore,
  SfButtonComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfSurveyFormComponent,
  SfSurveyModalComponent,
  SurveyStore,
} from '@sf/sf-base';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'sf-backoffice-trip-application-view',
  imports: [
    SfButtonComponent,
    SfSurveyFormComponent,
    NzCardComponent,
    SfIconAndTextComponent,
    FaIconComponent,
    NzTooltipDirective,
    SfSurveyModalComponent,
  ],
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfBackofficeSurveyViewComponent {
  private readonly __articleStore = inject(ArticleStore);
  private readonly __surveyStore = inject(SurveyStore);
  private readonly __router = inject(Router);
  private readonly __route = inject(ActivatedRoute);
  private readonly __message = inject(NzMessageService);

  public readonly icons = SfIcons;

  public readonly trips = this.__articleStore.trips;
  public readonly survey = this.__surveyStore.survey;
  public readonly loading = this.__articleStore.loading;

  constructor() {
    this.__route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        if (params.get('surveyId')) {
          const id = Number(params.get('surveyId'));
          await this.__surveyStore.loadSurveyById(id);
        }
      });
  }

  public async onCreateSurvey() {
    const survey = this.survey();
    if (survey) {
      await this.__surveyStore.createSurvey(survey);
      if (!this.loading()) {
        this.__message.success('Ankieta poprawnie aktualizowana');
      } else {
        this.__message.error('Ankieta nie została poprawnie aktualizowana');
      }
      await this.__router.navigate(['admin-backoffice/surveys']);
    }
  }

  public async onSaveSurvey() {
    const survey = this.survey();
    if (survey) {
      await this.__surveyStore.updateSurvey(survey);
      if (!this.loading()) {
        this.__message.success('Ankieta poprawnie dodana');
      } else {
        this.__message.error('Ankieta nie została poprawnie dodana');
      }
      await this.__router.navigate(['admin-backoffice/surveys']);
    }
  }
}
