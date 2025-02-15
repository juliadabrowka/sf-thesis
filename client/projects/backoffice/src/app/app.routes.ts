import {Routes} from '@angular/router';
import {SfBackofficeComponent} from './views/backoffice/backoffice.component';
import {SfBackofficeArticleTableComponent} from './views/article/article-table/article-table.component';
import {authGuard} from './auth-guard';
import {SfBackofficeArticleComponent} from './views/article/article.component';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: SfBackofficeArticleTableComponent
      },
      {
        path: 'articles/:articleId',
        component: SfBackofficeArticleComponent,

      },
      {
        path: 'create-article',
        component: SfBackofficeArticleComponent,
      },
    ]
  }
];
