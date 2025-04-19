import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SfFilterArticlesByTypePipe } from './filter-articles-by-type.pipe';
import { SfTilesComponent } from '../tiles/tiles.component';
import { ArticleStore } from '../../state/article-store';
import { ArticleCategory } from '../../data-types';

@Component({
  selector: 'sf-main-page',
  imports: [
    NzDividerComponent,
    PageTitleComponent,
    SfFilterArticlesByTypePipe,
    SfTilesComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfMainPageComponent {
  private readonly articleStore = inject(ArticleStore);

  public readonly __articles = this.articleStore.articles;
  public readonly __sections = [
    {
      title: 'superfemka to wyprawy rowerowe, wyjazdy i warsztaty dla kobiet',
      subtitle: 'niezapomniana podróż dla każdej z nas!',
      articleType: ArticleCategory.Wyprawy,
    },
    {
      title: 'wyjazdy dla kobiet - fotorelacje z naszych podróży',
      subtitle: 'nasze wyprawy',
      articleType: ArticleCategory.Fotorelacje,
    },
    {
      title: 'Ciekawostki od Superfemki',
      subtitle: 'Informacje bliskie i dalekie',
      articleType: ArticleCategory.Ciekawostki,
    },
    {
      title: 'rekomendacje superfemki',
      subtitle: 'sprzęt, porady i wiele innych',
      articleType: ArticleCategory.Rekomendacje,
    },
  ];
}
