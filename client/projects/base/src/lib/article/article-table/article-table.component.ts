import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, output, signal} from '@angular/core';
import {ArticleDTO} from '@sf/sf-base';
import {NzTableModule, NzTableSortFn, NzThAddOnComponent} from 'ng-zorro-antd/table';

export interface ColumnItem<T> {
  name: string;
  sortFn: NzTableSortFn<T>;
}

@Component({
  selector: 'sf-article-table',
  imports: [
    NzThAddOnComponent,
    NzTableModule
  ],
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleTableComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly __articles$$ = signal<ArticleDTO[]>([]);
  public readonly __columns: ColumnItem<ArticleDTO>[] = [
    {
      name: "Tytuł",
      sortFn: (a: ArticleDTO, b: ArticleDTO) => a.Title.localeCompare(b.Title),
    },
    {
      name: "Kraj",
      sortFn: (a: ArticleDTO, b: ArticleDTO) => a.Country.toString().localeCompare(b.Country.toString()),
    },
    {
      name: "Kategoria",
      sortFn: (a: ArticleDTO, b: ArticleDTO) => a.ArticleCategory.toString().localeCompare(b.ArticleCategory.toString()),
    }
  ];

  @Input() public set sfArticles(articles: ArticleDTO[] | null | undefined) {
    this.__articles$$.set(articles ?? []);
  }

  public readonly sfOnArticleClick = output<ArticleDTO>();

  trackByIndex(_: number, data: ArticleDTO): number {
    return data.Id;
  }
}
