import { Pipe, PipeTransform } from '@angular/core';
import { ArticleCategory, ArticleDTO } from '@sf/sf-base';

@Pipe({
  name: 'sfFilterArticlesByType',
})
export class SfFilterArticlesByTypePipe implements PipeTransform {
  transform(articles: ArticleDTO[], type: ArticleCategory): ArticleDTO[] {
    return articles.filter((a) => a.ArticleCategory === type);
  }
}
