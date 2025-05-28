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
  private readonly __articleStore = inject(ArticleStore);

  public readonly articles = this.__articleStore.articles;
  public readonly sections = [
    {
      title: 'superfemka to wyprawy rowerowe, wyjazdy i warsztaty dla kobiet',
      subtitle: 'niezapomniana podróż dla każdej z nas!',
      articleType: ArticleCategory.Trips,
    },
    {
      title: 'wyjazdy dla kobiet - fotorelacje z naszych podróży',
      subtitle: 'nasze wyprawy',
      articleType: ArticleCategory.Photostories,
    },
    {
      title: 'Ciekawostki od Superfemki',
      subtitle: 'Informacje bliskie i dalekie',
      articleType: ArticleCategory.Tips,
    },
    {
      title: 'rekomendacje superfemki',
      subtitle: 'sprzęt, porady i wiele innych',
      articleType: ArticleCategory.Recommendations,
    },
  ];
}
