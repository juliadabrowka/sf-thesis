import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TripTermDTO } from '@sf/sf-base';

@Component({
  selector: 'sf-trip-term-list',
  imports: [],
  templateUrl: './trip-term-list.component.html',
  styleUrl: './trip-term-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTermListComponent {
  public readonly sfTripTerms = input<TripTermDTO[] | null | undefined>([]);
}
