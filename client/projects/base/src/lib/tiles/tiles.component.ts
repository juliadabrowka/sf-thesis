import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ArticleDTO} from '@sf/sf-base';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'sf-tiles',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTilesComponent {
  public sfArticles = input<ArticleDTO[]>([]);
  public readonly __articles$ = toObservable(this.sfArticles);
}
