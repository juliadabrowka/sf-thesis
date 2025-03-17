import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {SfIconAndTextComponent, SfIcons} from '@sf/sf-base';
import {BehaviorSubject} from 'rxjs';
import {SfTripInlineComponent} from '../trip-inline/trip-inline.component';
import {TripFlag} from '../trip-calendar/trip-calendar.component';

@Component({
  selector: 'sf-trip-grid',
  imports: [
    SfIconAndTextComponent,
    SfTripInlineComponent
  ],
  templateUrl: './trip-grid.component.html',
  styleUrl: './trip-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripGridComponent {
  private readonly cdr = inject(ChangeDetectorRef)

  public readonly __title$$ = new BehaviorSubject<string>('');
  public readonly __icons = SfIcons;

  @Input() public set sfTitle(title: string | null | undefined) {
    this.__title$$.next(title ?? '');
    this.cdr.markForCheck();
  }

  public readonly __trips$$ = new BehaviorSubject<TripFlag[]>([]);

  @Input() public set sfTrips(trips: TripFlag[] | null | undefined) {
    this.__trips$$.next(trips ?? []);
    this.cdr.markForCheck();
  }

  @Input() public sfIcon: string | null | undefined;
}
