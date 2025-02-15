import {Component} from '@angular/core';
import {TripGridComponent} from '../trip-grid/trip-grid.component';

@Component({
  selector: 'sf-trip-calendar',
  imports: [
    TripGridComponent
  ],
  templateUrl: './trip-calendar.component.html',
  styleUrl: './trip-calendar.component.css'
})
export class TripCalendarComponent {

}
