import {Routes} from '@angular/router';
import {SfLoginViewComponent} from './login-view.component';
import {loginRoutes} from '@sf/sf-backoffice';

export const loginViewRoutes: Routes = [
  {
    path: '',
    component: SfLoginViewComponent,
    children: [...loginRoutes]
  }
]
