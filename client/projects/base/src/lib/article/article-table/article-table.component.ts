import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ArticleDTO } from '@sf/sf-base';
import {
  NzTableModule,
  NzTableSortFn,
  NzThAddOnComponent,
} from 'ng-zorro-antd/table';

export interface ColumnItem<T> {
  name: string;
  sortFn: NzTableSortFn<T> | null;
}

@Component({
  selector: 'sf-article-table',
  imports: [NzThAddOnComponent, NzTableModule],
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleTableComponent {
  public readonly columns: ColumnItem<ArticleDTO>[] = [
    {
      name: 'Tytuł',
      sortFn: (a: ArticleDTO, b: ArticleDTO) => a.Title.localeCompare(b.Title),
    },
    {
      name: 'Kraj',
      sortFn: (a: ArticleDTO, b: ArticleDTO) =>
        a.Country.toString().localeCompare(b.Country.toString()),
    },
    {
      name: 'Kategoria',
      sortFn: (a: ArticleDTO, b: ArticleDTO) =>
        a.ArticleCategory.toString().localeCompare(
          b.ArticleCategory.toString(),
        ),
    },
  ];
  public readonly sfArticles = input([], {
    transform: (articles: ArticleDTO[] | null | undefined) => articles ?? [],
  });

  readonly sfLoading = input<boolean | null | undefined>();
  public readonly sfOnArticleClick = output<ArticleDTO>();
}
