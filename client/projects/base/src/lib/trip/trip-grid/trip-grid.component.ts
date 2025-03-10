import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, signal} from '@angular/core';
import {SfTripInlineComponent} from '../trip-inline/trip-inline.component';
import {TripDTO} from '@sf/sf-base';

@Component({
  selector: 'sf-trip-grid',
  imports: [
    SfTripInlineComponent,
  ],
  templateUrl: './trip-grid.component.html',
  styleUrl: './trip-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripGridComponent {
  private readonly cdr = inject(ChangeDetectorRef)

  public readonly __title$ = signal<string>('');

  @Input() public set sfTitle(title: string | null | undefined) {
    this.__title$.set(title ?? '')
  }

  public readonly __trips$$ = signal<TripDTO[]>([]);
}
