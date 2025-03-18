import {Routes} from '@angular/router';
import {SfTripDetailsViewComponent} from './trip-details-view.component';
import {tripDetailsRoutes} from '@sf/sf-base';

export const tripDetailsViewRoutes: Routes = [
  {
    path: '',
    component: SfTripDetailsViewComponent,
    children: [...tripDetailsRoutes]
  }
]

