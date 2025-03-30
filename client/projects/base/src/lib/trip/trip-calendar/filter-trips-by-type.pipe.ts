import { inject, Pipe, PipeTransform } from '@angular/core';
import { ArticleService, Country, TripDTO, TripType } from '@sf/sf-base';
import { TripFlag } from './trip-calendar.component';

@Pipe({
  name: 'sfFilterTripsByType',
})
export class SfFilterTripsByTypePipe implements PipeTransform {
  private readonly articleService = inject(ArticleService);
  transform(trips: TripDTO[], type: TripType): TripFlag[] {
    // return trips.filter(trip => trip.Type === type)
    //   .map(async (t) => {
    //     const apiCall = this.articleService.getArticleDetails(t.ArticleId ?? -1)
    //     const article = await firstValueFrom(apiCall)
    //     return {trip: t, flagSrc: this.getFlagByTripCountry(article.Country)};
    //     });
    return [];
  }

  private getFlagByTripCountry(country: Country | undefined) {
    switch (country) {
      case Country.Japonia:
        return '/assets/japan-flag.jpg';
      case Country.Kuba:
        return '/assets/cuba-flag.jpg';
      case Country.Portugalia:
        return '/assets/portugal-flag.jpg';
      case Country.Polska:
        return '/assets/poland-flag.jpg';
      case Country.Norwegia:
        return '/assets/norge-flag.png';
      default:
        return '/assets/poland-flag.jpg';
    }
  }
}
