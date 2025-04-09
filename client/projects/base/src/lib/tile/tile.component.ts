import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ArticleDTO,
  ArticleStore,
  SfButtonComponent,
  SfIcons,
  TripTermDTO,
} from '@sf/sf-base';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getTripLength,
  getTripMonth,
} from '../trip/trip-details-short/trip-details-short.component';

@Component({
  selector: 'sf-tile',
  imports: [FaIconComponent, SfButtonComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);

  public readonly sfArticle = input<ArticleDTO | null | undefined>();

  public readonly __icons = SfIcons;

  public __getTripMonth(tripTerms: TripTermDTO[]) {
    return getTripMonth(tripTerms);
  }

  __getTripLength(tripTerms: TripTermDTO[]): string {
    return getTripLength(tripTerms);
  }
  async __goToArticle(value: ArticleDTO | undefined) {
    if (!value) throw Error('No article but should be');
    await this.router.navigate([value.Url], {
      relativeTo: this.activatedRoute,
    });
    this.articleStore.setArticle(value);
  }
}
