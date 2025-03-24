import {Routes} from '@angular/router';
import {SfMainPageComponent} from './main-page.component';
import {SfArticleDetailsComponent} from '../article/article-details/article-details.component';

export const mainPageRoutes: Routes = [
  {
    path: '',
    component: SfMainPageComponent
  },
  {
    path: ':customLink',
    component: SfArticleDetailsComponent,
  }
]
