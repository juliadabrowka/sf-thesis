import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  ArticleDTO,
  ArticleStore,
  SfArticleTableComponent,
  SfIconAndTextComponent,
} from '@sf/sf-base';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sf-backoffice-filtered-table-view',
  imports: [NzCardComponent, SfArticleTableComponent, SfIconAndTextComponent],
  templateUrl: './filtered-table-view.component.html',
  styleUrl: './filtered-table-view.component.css',
})
export class SfFilteredTableViewComponent {
  private readonly __store = inject(ArticleStore);
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);

  public readonly articles = signal<ArticleDTO[]>([]);
  public readonly loading = this.__store.loading;
  public readonly icon = signal<IconDefinition | undefined>(undefined);
  public readonly title = signal('');

  private readonly __articles = computed(() => this.__store.articles());
  private readonly __categoryFilter = computed(() =>
    this.__store.categoryFilter(),
  );
  private readonly __tripFilter = computed(() => this.__store.tripFilter());

  constructor() {
    this.__activatedRoute.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const categoryFilter = data['categoryFilter'];
      const tripFilter = data['tripFilter'];
      this.icon.set(data['icon']);
      this.title.set(data['title']);

      this.__store.setCategoryFilter(categoryFilter);
      this.__store.setTripFilter(tripFilter);
    });

    effect(() => {
      const cf = this.__categoryFilter();
      const tf = this.__tripFilter();
      const articles = this.__articles();

      const filteredArticles = articles.filter(
        (article) =>
          article.ArticleCategory === cf &&
          (tf ? article.TripDTO?.Type === tf : false),
      );

      this.articles.set(filteredArticles);
    });
  }

  public async onArticleClicked(article: ArticleDTO) {
    await this.__router.navigate([`admin-backoffice/articles/${article.Id}`]);
  }
}
