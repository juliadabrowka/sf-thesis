import { SfBackofficeDefaultViewComponent } from './default-view.component';
import { Routes } from '@angular/router';

export const defaultViewRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeDefaultViewComponent,
    children: [
      {
        path: 'trip-application/:hash',
        loadChildren: () =>
          import('./trip-application-view/trip-application-view.routes').then(
            (m) => m.tripApplicationViewRoutes,
          ),
      },
      {
        path: 'kalendarium-wypraw',
        loadChildren: () =>
          import(
            '../../views/default-view/trip-calendar-view/trip-calendar-view.routes'
          ).then((m) => m.tripCalendarViewRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../views/default-view/main-page-view/main-page-view.routes'
          ).then((m) => m.mainPageViewRoutes),
      },
    ],
  },
];
