import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { SfBackofficeTripViewComponent } from './views/trip-view/trip-view.component';
import { SfBackofficeArticleViewComponent } from './views/article-view/article-view.component';
import { SfBackofficeComponent } from './views/backoffice-view/backoffice-view.component';
import { AppComponent } from './app.component';
import { SfBackofficeSurveyViewComponent } from './views/survey-view/survey-view.component';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: SfBackofficeComponent,
      },
      {
        path: 'articles/:articleId',
        component: SfBackofficeArticleViewComponent,
      },
      {
        path: 'create-article',
        component: SfBackofficeArticleViewComponent,
      },
      {
        path: 'create-trip',
        component: SfBackofficeTripViewComponent,
      },
      {
        path: 'create-survey',
        component: SfBackofficeSurveyViewComponent,
      },
    ],
  },
];
