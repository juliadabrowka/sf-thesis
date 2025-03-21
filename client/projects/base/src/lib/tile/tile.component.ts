import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ArticleDTO, SfIcons} from '@sf/sf-base';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'sf-tile',
  imports: [
    AsyncPipe,
    FaIconComponent
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  public sfArticle = input<ArticleDTO | null | undefined>();
  public __article$ = toObservable(this.sfArticle);

  public readonly __icons = SfIcons;
}
