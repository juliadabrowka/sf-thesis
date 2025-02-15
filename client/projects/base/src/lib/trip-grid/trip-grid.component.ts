import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {TripInlineComponent} from '../trip-inline/trip-inline.component';
import {BehaviorSubject} from 'rxjs';
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

  public readonly __title$ = new BehaviorSubject<string>('');

  @Input() public set sfTitle(title: string | null | undefined) {
    this.__title$.next(title ?? '')
    this.cdr.markForCheck()
  }

  public readonly __trips$$ = new BehaviorSubject<TripDTO[]>([]);
}
