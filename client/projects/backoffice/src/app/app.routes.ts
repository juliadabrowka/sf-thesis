import {Routes} from '@angular/router';
import {authGuard} from './auth-guard';
import {SfBackofficeTripViewComponent} from './views/trip-view/trip-view.component';
import {SfBackofficeArticleViewComponent} from './views/article-view/article-view.component';
import {SfBackofficeComponent} from './views/backoffice-view/backoffice.component';
import {SfBackofficeMainPageViewComponent} from './views/main-page-view/main-page-view.component';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: SfBackofficeMainPageViewComponent
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
    ]
  }
];
