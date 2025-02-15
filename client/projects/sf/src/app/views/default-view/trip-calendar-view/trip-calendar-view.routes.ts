import {Routes} from '@angular/router';
import {SfTripCalendarViewComponent} from './trip-calendar-view.component';
import {tripCalendarRoutes} from '@sf/sf-base';

export const tripCalendarViewRoutes: Routes = [
  {
    path: '',
    component: SfTripCalendarViewComponent,
    children: [...tripCalendarRoutes]
  }
]
