import { Routes } from '@angular/router';
import { SurveyViewComponent } from './survey-view.component';
import { surveysRoutes } from '../../../../../../base/src/lib/survey/survey.routes';

export const surveyViewRoutes: Routes = [
  {
    path: '',
    component: SurveyViewComponent,
    children: [...surveysRoutes],
  },
];
