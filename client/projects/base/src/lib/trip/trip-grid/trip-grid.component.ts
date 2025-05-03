import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SfIconAndTextComponent } from '@sf/sf-base';
import { SfTripInlineComponent } from '../trip-inline/trip-inline.component';
import { TripFlag } from '../trip-calendar/trip-calendar.component';

@Component({
  selector: 'sf-trip-grid',
  imports: [SfIconAndTextComponent, SfTripInlineComponent],
  templateUrl: './trip-grid.component.html',
  styleUrl: './trip-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripGridComponent {
  public readonly sfTrips = input<TripFlag[] | null | undefined>();
  public readonly sfTitle = input<string | null | undefined>();
  public readonly sfIcon = input<string | null | undefined>();
}
