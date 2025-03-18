import {ChangeDetectorRef, Component, inject, Input, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {TripFlag} from '../trip-calendar/trip-calendar.component';
import {SfFormatPricePipe} from './trip-inline-format-price.pipe';
import {SfButtonComponent, TripDTO} from '@sf/sf-base';
import {ApplicationFormComponent} from '../../application-form/application-form.component';

@Component({
  selector: 'sf-trip-inline',
  imports: [
    DatePipe,
    SfFormatPricePipe,
    SfButtonComponent,
    ApplicationFormComponent
  ],
  templateUrl: './trip-inline.component.html',
  styleUrl: './trip-inline.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SfTripInlineComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  public __showSlider = false;
  public __trip$$ = new BehaviorSubject<TripFlag | undefined>(undefined);

  @Input() public set sfTripInfo(trip: TripFlag | null | undefined) {
    this.__trip$$.next(trip ?? undefined);
    this.cdr.markForCheck();
  }

  public __onShowSlider() {
    this.__showSlider = !this.__showSlider;
  }

  __navigateToTrip(trip: TripDTO) {
    console.log(trip)
  }
}
