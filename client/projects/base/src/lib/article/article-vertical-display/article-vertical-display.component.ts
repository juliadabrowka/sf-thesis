import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleDTO } from '@sf/sf-base';
import { TileComponent } from '../../tile/tile.component';

@Component({
  selector: 'sf-article-vertical-display',
  imports: [TileComponent],
  templateUrl: './article-vertical-display.component.html',
  styleUrl: './article-vertical-display.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleVerticalDisplayComponent {
  public readonly sfArticles = input<ArticleDTO[] | null | undefined>();
}
