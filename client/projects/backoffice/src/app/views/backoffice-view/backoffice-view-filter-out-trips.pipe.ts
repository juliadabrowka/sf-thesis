import {Pipe, PipeTransform} from '@angular/core';
import {ArticleCategory, ArticleDTO} from '@sf/sf-base';

@Pipe({
  name: 'sfBackofficeFilterOutTrips'
})
export class SfBackofficeFilterOutTripsPipe implements PipeTransform {

  transform(articles: ArticleDTO[]): ArticleDTO[] {
    return articles.filter(a => a.ArticleCategory !== ArticleCategory.Wyprawy);
  }

}
