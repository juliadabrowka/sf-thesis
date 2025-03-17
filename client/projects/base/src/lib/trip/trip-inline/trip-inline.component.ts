import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {TripFlag} from '../trip-calendar/trip-calendar.component';
import {SfFormatPricePipe} from './format-price.pipe';

@Component({
  selector: 'sf-trip-inline',
  imports: [
    DatePipe,
    SfFormatPricePipe
  ],
  templateUrl: './trip-inline.component.html',
  styleUrl: './trip-inline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripInlineComponent {
  private readonly cdr = inject(ChangeDetectorRef)

  public __trip$$ = new BehaviorSubject<TripFlag | undefined>(undefined);

  @Input() public set sfTripInfo(trip: TripFlag | null | undefined) {
    this.__trip$$.next(trip ?? undefined);
    this.cdr.markForCheck();
  }
}
