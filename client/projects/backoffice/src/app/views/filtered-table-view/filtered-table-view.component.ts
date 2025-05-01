import { Component, effect, inject, signal } from '@angular/core';
import {
  ArticleCategory,
  ArticleDTO,
  ArticleStore,
  DefaultArticleCategoryValue,
  SfArticleTableComponent,
} from '@sf/sf-base';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-backoffice-filtered-table-view',
  imports: [NzCardComponent, SfArticleTableComponent],
  templateUrl: './filtered-table-view.component.html',
  styleUrl: './filtered-table-view.component.css',
})
export class SfFilteredTableViewComponent {
  private readonly store = inject(ArticleStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly __articles = signal<ArticleDTO[]>([]);
  public readonly __loading$$ = this.store.loading;

  private readonly categoryFilter = this.store.categoryFilter;

  constructor() {
    this.activatedRoute.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const filter = data['filter'];
      let articleCategory = DefaultArticleCategoryValue;
      switch (filter) {
        case 'recommendations':
          articleCategory = ArticleCategory.Rekomendacje;
          break;
        case 'tips':
          articleCategory = ArticleCategory.Ciekawostki;
          break;
        case 'stories':
          articleCategory = ArticleCategory.Fotorelacje;
          break;
      }
      this.store.setCategoryFilter(articleCategory);
    });

    effect(() => {
      const cf = this.categoryFilter();
      const articles = this.store.articles();
      const filteredArticles = articles.filter(
        (article) => article.ArticleCategory === cf,
      );

      this.__articles.set(filteredArticles);
    });
  }

  public async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`admin-backoffice/articles/${article.Id}`]);
  }
}
