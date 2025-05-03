import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ArticleDTO, ArticleStore, SfIcons } from '@sf/sf-base';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getTripLength,
  getTripMonth,
} from '../trip/trip-details-short/trip-details-short.component';

@Component({
  selector: 'sf-tile',
  imports: [FaIconComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);

  public readonly icons = SfIcons;
  public readonly sfArticle = input<ArticleDTO | null | undefined>();

  protected readonly getTripMonth = getTripMonth;
  protected readonly getTripLength = getTripLength;

  async goToArticle(value: ArticleDTO | undefined) {
    if (!value) throw Error('No article but should be');

    await this.__router.navigate([value.Url], {
      relativeTo: this.__activatedRoute,
    });
    this.__articleStore.setArticle(value);
  }
}
