import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, output} from '@angular/core';
import {ArticleDTO} from '@sf/sf-base';
import {BehaviorSubject} from 'rxjs';
import {NzTableModule, NzTableSortFn, NzThAddOnComponent} from 'ng-zorro-antd/table';

interface ColumnItem {
  name: string;
  sortFn: NzTableSortFn<ArticleDTO>;
}

@Component({
  selector: 'sf-article-table',
  imports: [
    NzThAddOnComponent,
    NzTableModule
  ],
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfArticleTableComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly __articles$$ = new BehaviorSubject<ArticleDTO[]>([]);
  public readonly __columns: ColumnItem[] = [
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
    this.__articles$$.next(articles ?? []);
    console.log(articles)
    this.cdr.markForCheck();
  }

  public readonly sfOnArticleClick = output<ArticleDTO>();
}
