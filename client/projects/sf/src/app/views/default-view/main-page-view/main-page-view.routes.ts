import {Routes} from '@angular/router';
import {SfBackofficeMainPageViewComponent} from './main-page-view.component';
import {mainPageRoutes} from '@sf/sf-base';

export const mainPageViewRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeMainPageViewComponent,
    children: [...mainPageRoutes]
  }
]
