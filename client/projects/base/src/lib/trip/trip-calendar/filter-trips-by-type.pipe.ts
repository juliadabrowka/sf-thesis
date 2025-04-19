import { inject, Pipe, PipeTransform } from '@angular/core';
import { ArticleService, Country, TripDTO, TripType } from '@sf/sf-base';
import { TripFlag } from './trip-calendar.component';
import { firstValueFrom } from 'rxjs';

@Pipe({
  name: 'sfFilterTripsByType',
})
export class SfFilterTripsByTypePipe implements PipeTransform {
  private readonly articleService = inject(ArticleService);

  async transform(trips: TripDTO[], type: TripType): Promise<TripFlag[]> {
    return await Promise.all(
      trips
        .filter((trip) => trip.Type === type && trip.ArticleId)
        .map(async (t) => {
          const article = await firstValueFrom(
            this.articleService.getArticleDetails(t.ArticleId ?? -1),
          );
          return {
            trip: t,
            flagSrc: this.getFlagByTripCountry(article.Country),
          };
        }),
    );
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
