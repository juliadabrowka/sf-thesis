import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ArticleCategory, ArticleDTO, ArticleStore } from '@sf/sf-base';
import { TileComponent } from '../tile/tile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'sf-tiles',
  imports: [TileComponent],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTilesComponent {
  private readonly __router = inject(Router);
  private readonly __articleStore = inject(ArticleStore);

  public readonly sfArticles = input<ArticleDTO[] | null | undefined>();

  async goToAllByCategory(category: ArticleCategory) {
    const categoryRoutes = {
      [ArticleCategory.Tips]: 'ciekawostki',
      [ArticleCategory.Recommendations]: 'rekomendacje',
      [ArticleCategory.Trips]: 'nasze-robinsonady',
      [ArticleCategory.Photostories]: 'foto-relacje',
    };

    const route = categoryRoutes[category];

    if (route) {
      this.__articleStore.setArticle(undefined);
      return this.__router.navigate([route]);
    }
  }
}
