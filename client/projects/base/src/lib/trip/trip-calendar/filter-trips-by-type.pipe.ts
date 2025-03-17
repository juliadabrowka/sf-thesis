import {Pipe, PipeTransform} from '@angular/core';
import {Country, TripDTO, TripType} from '@sf/sf-base';
import {TripFlag} from './trip-calendar.component';

@Pipe({
  name: 'sfFilterTripsByType'
})
export class SfFilterTripsByTypePipe implements PipeTransform {
  transform(trips: TripDTO[], type: TripType): TripFlag[] {
    return trips.filter(trip => trip.Type === type)
      .map(t => ({trip: t, flagSrc: this.getFlagByTripCountry(t.ArticleDto?.Country)}));
  }

  private getFlagByTripCountry(country: Country | undefined) {
    switch (country) {
      case Country.Japonia:
        return "/assets/japan-flag.png";
      case Country.Kuba:
        return "/assets/cuba-flag.png";
      case Country.Portugalia:
        return "/assets/portugal-flag.png";
      case Country.Polska:
        return "/assets/poland-flag.png";
      default:
        return "/assets/poland-flag.png";
    }
  }
}
