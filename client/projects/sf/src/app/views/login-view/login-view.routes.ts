import {Routes} from '@angular/router';
import {SfBackofficeLoginViewComponent} from './login-view.component';
import {loginRoutes} from '@sf/sf-backoffice';

export const loginViewRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeLoginViewComponent,
    children: [...loginRoutes]
  }
]
