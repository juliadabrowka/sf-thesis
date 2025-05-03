import { Pipe, PipeTransform } from '@angular/core';
import { ArticleDTO } from '@sf/sf-base';

@Pipe({
  name: 'sfMapArticlesToTrips',
})
export class SfMapArticlesToTrips implements PipeTransform {
  transform(articles: ArticleDTO[]) {
    return articles.filter((a) => !!a.TripDTO).map((a) => a.TripDTO!);
  }
}
