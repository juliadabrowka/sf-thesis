import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleDTO } from '@sf/sf-base';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'sf-tiles',
  imports: [TileComponent],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTilesComponent {
  public readonly sfArticles = input<ArticleDTO[] | null | undefined>();
}
