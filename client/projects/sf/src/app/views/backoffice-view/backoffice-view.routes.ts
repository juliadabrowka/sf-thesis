import {Route} from '@angular/router';
import {SfBackofficeViewComponent} from './backoffice-view.component';
import {backofficeRoutes} from '@sf/sf-backoffice';

export const backofficeViewRoutes: Route[] = [
  {
    path: '',
    component: SfBackofficeViewComponent,
    children: [...backofficeRoutes]
  }
]
