import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SfTripGridComponent} from '../trip-grid/trip-grid.component';

@Component({
  selector: 'sf-trip-calendar',
  imports: [
    SfTripGridComponent
  ],
  templateUrl: './trip-calendar.component.html',
  styleUrl: './trip-calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripCalendarComponent {

}
