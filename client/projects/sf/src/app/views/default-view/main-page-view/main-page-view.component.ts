import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ArticleStore} from '../../../../../../base/src/state/article/article.store';
import {ArticleCategory, PageTitleComponent, SfTilesComponent} from '@sf/sf-base';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {SfFilterArticlesByTypePipe} from './filter-articles-by-type.pipe';

@Component({
  selector: 'sf-main-page-view',
  imports: [
    PageTitleComponent,
    NzDividerComponent,
    SfTilesComponent,
    SfFilterArticlesByTypePipe,
  ],
  templateUrl: './main-page-view.component.html',
  styleUrl: './main-page-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeMainPageViewComponent {
  private readonly articleStore = inject(ArticleStore);

  public readonly __articles$$ = computed(() => this.articleStore.articles())

  public readonly __sections = [
    {
      title: "superfemka to wyprawy rowerowe, wyjazdy i warsztaty dla kobiet",
      subtitle: "niezapomniana podróż dla każdej z nas!",
      articleType: ArticleCategory.Wyprawy
    },
    {
      title: "wyjazdy dla kobiet - fotorelacje z naszych podróży",
      subtitle: "nasze wyprawy",
      articleType: ArticleCategory.Fotorelacje
    },
    {
      title: 'Ciekawostki od Superfemki',
      subtitle: 'Informacje bliskie i dalekie',
      articleType: ArticleCategory.Ciekawostki
    },
    {
      title: 'rekomendacje superfemki',
      subtitle: 'sprzęt, porady i wiele innych',
      articleType: ArticleCategory.Rekomendacje
    }
  ];

  // constructor() {
  //   this.articleStore.loadArticleList();
  // }
}
