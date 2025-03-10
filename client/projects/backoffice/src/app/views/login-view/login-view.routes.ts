import {Routes} from '@angular/router';

export const loginRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login-view.component').then(m => m.SfBackofficeLoginComponent)
  }
]
