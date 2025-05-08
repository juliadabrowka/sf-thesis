import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sf-trip-calendar-view',
  imports: [RouterOutlet],
  templateUrl: './trip-calendar-view.component.html',
  styleUrl: './trip-calendar-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfBackofficeTripCalendarViewComponent {}
