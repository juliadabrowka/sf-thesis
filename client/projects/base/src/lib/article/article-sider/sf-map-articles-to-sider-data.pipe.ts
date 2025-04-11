import { Pipe, PipeTransform } from '@angular/core';
import { ArticleDTO } from '@sf/sf-base';

@Pipe({
  name: 'sfArticleSiderData',
})
export class SfArticleSiderDataPipe implements PipeTransform {
  transform(articles: ArticleDTO[]) {
    const siderData: { category: string; articles: ArticleDTO[] }[] = [];

    articles.forEach((article) => {
      const categoryGroup = siderData.find(
        (group) => group.category === article.ArticleCategory,
      );

      if (categoryGroup) {
        categoryGroup.articles.push(article);
      } else {
        siderData.push({
          category: article.ArticleCategory,
          articles: [article],
        });
      }
    });
    return siderData;
  }
}
