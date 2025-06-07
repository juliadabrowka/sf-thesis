import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ArticleDTO, ArticleStore, SfIcons } from '@sf/sf-base';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  getTripLength,
  getTripMonth,
} from '../trip/trip-details-short/trip-details-short.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sf-tile',
  imports: [FaIconComponent, NgClass],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  private readonly __router = inject(Router);
  private readonly __articleStore = inject(ArticleStore);

  public readonly icons = SfIcons;
  public readonly sfArticle = input<ArticleDTO | null | undefined>();
  public readonly sfMainPage = input<boolean | null | undefined>();
  public readonly sfContainerHeight = input<number | null | undefined>();
  public readonly sfContainerWidth = input<number | null | undefined>();
  public readonly sfMediaHeight = input<number | null | undefined>();
  public readonly sfSectionTitle = input<string | null | undefined>();
  public readonly sfDescription = input<string | null | undefined>();

  protected readonly getTripMonth = getTripMonth;
  protected readonly getTripLength = getTripLength;

  async goToArticle(value: ArticleDTO | undefined) {
    if (!value) throw Error('No article but should be');

    await this.__router.navigate([value.Url]);
    this.__articleStore.setArticle(value);
  }
}
