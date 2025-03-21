import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SfTripGridComponent} from '../trip-grid/trip-grid.component';
import {PageTitleFramedComponent} from '../../page-title-framed/page-title-framed.component';
import {TripDTO, TripStore, TripType} from '@sf/sf-base';
import {SfFilterTripsByTypePipe} from './filter-trips-by-type.pipe';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';

export interface TripFlag {
  trip: TripDTO,
  flagSrc: string
}
@Component({
  selector: 'sf-trip-calendar',
  imports: [
    SfTripGridComponent,
    PageTitleFramedComponent,
    SfFilterTripsByTypePipe,
    NzDividerComponent,
    AsyncPipe
  ],
  templateUrl: './trip-calendar.component.html',
  styleUrl: './trip-calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripCalendarComponent {
  private readonly tripStore = inject(TripStore);

  public readonly titleFramed = "KALENDARIUM WYPRAW 2024/2025";
  public readonly __tripTypes = Object.keys(TripType).map(k => ({
    label: TripType[k as keyof typeof TripType],
    value: k as TripType,
    icon: this.getDataForTripType(TripType[k as keyof typeof TripType]),
  }))

  public readonly __trips$ = toObservable(this.tripStore.trips);

  private getDataForTripType(tripTypeElement: TripType) {
    switch (tripTypeElement) {
      case TripType.Bike:
        return "/assets/wyprawy-bike-icon.png";
      case TripType.Weekend:
        return "/assets/wyprawy-weekend-icon.png";
      default:
        return "/assets/wyprawy-classic-icon.png";
    }
  }
}
