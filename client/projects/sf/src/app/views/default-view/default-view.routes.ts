import {SfBackofficeDefaultViewComponent} from './default-view.component';
import {Routes} from '@angular/router';

export const defaultViewRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeDefaultViewComponent,
    children: [
      {
        path: 'kalendarium-wypraw',
        loadChildren: () =>
          import('../../views/default-view/trip-calendar-view/trip-calendar-view.routes').then(m => m.tripCalendarViewRoutes)
      },
      {
        path: '',
        loadChildren: () =>
          import('../../views/default-view/main-page-view/main-page-view.routes').then(m => m.mainPageViewRoutes)
      },
    ]
  },
]
