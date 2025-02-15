import {Routes} from '@angular/router';
import {SfMainPageViewComponent} from './main-page-view.component';
import {mainPageRoutes} from '@sf/sf-base';

export const mainPageViewRoutes: Routes = [
  {
    path: '',
    component: SfMainPageViewComponent,
    children: [...mainPageRoutes]
  }
]
