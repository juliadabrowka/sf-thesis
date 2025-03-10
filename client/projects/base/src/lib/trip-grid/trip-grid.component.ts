import {ChangeDetectorRef, Component, inject, Input, signal} from '@angular/core';
import {TripInlineComponent} from '../trip-inline/trip-inline.component';
import {TripDTO} from '@sf/sf-base';

@Component({
  selector: 'sf-trip-grid',
  imports: [
    TripInlineComponent,
  ],
  templateUrl: './trip-grid.component.html',
  styleUrl: './trip-grid.component.css'
})
export class TripGridComponent {
  private readonly cdr = inject(ChangeDetectorRef)

  public readonly __title$ = signal<string>('');

  @Input() public set sfTitle(title: string | null | undefined) {
    this.__title$.set(title ?? '')
    this.cdr.markForCheck()
  }

  public readonly __trips$$ = signal<TripDTO[]>([]);
}
