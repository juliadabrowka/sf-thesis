import { Routes } from '@angular/router';
import { SfTripApplicationView } from './trip-application-view.component';
import { tripApplicationRoutes } from '../../../../../../base/src/lib/trip/trip-application/trip-application.routes';

export const tripApplicationViewRoutes: Routes = [
  {
    path: '',
    component: SfTripApplicationView,
    children: [...tripApplicationRoutes],
  },
];
