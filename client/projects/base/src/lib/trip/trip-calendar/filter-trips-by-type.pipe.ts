import { Pipe, PipeTransform } from '@angular/core';
import { Country, TripDTO, TripType } from '@sf/sf-base';
import { TripFlag } from './trip-calendar.component';

@Pipe({
  name: 'sfFilterTripsByType',
})
export class SfFilterTripsByTypePipe implements PipeTransform {
  async transform(trips: TripDTO[], type: TripType): Promise<TripFlag[]> {
    return await Promise.all(
      trips
        .filter((trip) => trip.Type === type && trip.ArticleId)
        .map(async (t) => {
          const article = t.ArticleDTO;
          return {
            trip: t,
            flagSrc: this.getFlagByTripCountry(article?.Country),
          };
        }),
    );
  }

  private getFlagByTripCountry(country: Country | undefined) {
    switch (country) {
      case Country.Japan:
        return '/assets/japan-flag.jpg';
      case Country.Cuba:
        return '/assets/cuba-flag.jpg';
      case Country.Portugal:
        return '/assets/portugal-flag.jpg';
      case Country.Poland:
        return '/assets/poland-flag.jpg';
      case Country.Norway:
        return '/assets/norge-flag.png';
      default:
        return '/assets/poland-flag.jpg';
    }
  }
}
