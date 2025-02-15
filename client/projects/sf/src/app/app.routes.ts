import {Routes} from '@angular/router';

export const sfAppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/default-view/default-view.routes').then(m => m.defaultViewRoutes)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login-view/login-view.routes').then(m => m.loginViewRoutes)
  },
  {
    path: 'admin-backoffice',
    loadChildren: () =>
      import('./views/backoffice-view/backoffice-view.routes').then(m => m.backofficeViewRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
