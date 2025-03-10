import {Routes} from '@angular/router';
import {SfBackofficeTripCalendarViewComponent} from './trip-calendar-view.component';
import {tripCalendarRoutes} from '@sf/sf-base';

export const tripCalendarViewRoutes: Routes = [
  {
    path: '',
    component: SfBackofficeTripCalendarViewComponent,
    children: [...tripCalendarRoutes]
  }
]
