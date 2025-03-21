import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ArticleDTO} from '@sf/sf-base';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {TileComponent} from '../tile/tile.component';

@Component({
  selector: 'sf-tiles',
  imports: [
    AsyncPipe,
    TileComponent
  ],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTilesComponent {
  public sfArticles = input<ArticleDTO[]>([]);
  public readonly __articles$ = toObservable(this.sfArticles);
}
