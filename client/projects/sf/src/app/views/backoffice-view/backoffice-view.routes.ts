import {Route} from '@angular/router';
import {SfAdminViewComponent} from './backoffice-view.component';
import {backofficeRoutes} from '@sf/sf-backoffice';

export const backofficeViewRoutes: Route[] = [
  {
    path: '',
    component: SfAdminViewComponent,
    children: [...backofficeRoutes]
  }
]
