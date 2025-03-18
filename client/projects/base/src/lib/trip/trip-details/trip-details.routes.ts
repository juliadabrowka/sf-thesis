import {Route} from '@angular/router';
import {SfTripDetailsComponent} from './trip-details.component';

export const tripDetailsRoutes: Route[] = [
  {
    path: ':tripName',
    component: SfTripDetailsComponent
  }
]
