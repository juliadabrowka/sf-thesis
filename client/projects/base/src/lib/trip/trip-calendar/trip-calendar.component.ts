import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SfTripGridComponent } from '../trip-grid/trip-grid.component';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { ArticleStore, TripDTO, TripType, TripTypeLabels } from '@sf/sf-base';
import { SfFilterTripsByTypePipe } from './filter-trips-by-type.pipe';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { AsyncPipe } from '@angular/common';

export interface TripFlag {
  trip: TripDTO;
  flagSrc: string;
}
@Component({
  selector: 'sf-trip-calendar',
  imports: [
    SfTripGridComponent,
    PageTitleFramedComponent,
    SfFilterTripsByTypePipe,
    NzDividerComponent,
    AsyncPipe,
  ],
  templateUrl: './trip-calendar.component.html',
  styleUrl: './trip-calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripCalendarComponent {
  private readonly __store = inject(ArticleStore);

  public readonly sfTrips = this.__store.trips;

  public readonly titleFramed = 'KALENDARIUM WYPRAW 2024/2025';
  public readonly tripTypes = Object.keys(TripType).map((k) => ({
    label: TripTypeLabels[k as keyof typeof TripType],
    value: k as TripType,
    icon: this.__getDataForTripType(TripType[k as keyof typeof TripType]),
  }));

  private __getDataForTripType(tripTypeElement: TripType) {
    switch (tripTypeElement) {
      case TripType.Bike:
        return '/assets/wyprawy-bike-icon.png';
      case TripType.Weekend:
        return '/assets/wyprawy-weekend-icon.png';
      default:
        return '/assets/wyprawy-classic-icon.png';
    }
  }
}
