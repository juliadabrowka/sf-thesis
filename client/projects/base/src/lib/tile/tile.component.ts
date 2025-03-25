import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ArticleDTO, ArticleStore, SfIcons} from '@sf/sf-base';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sf-tile',
  imports: [
    FaIconComponent
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);

  public readonly sfArticle = input<ArticleDTO | null | undefined>();

  public readonly __icons = SfIcons;

  async __goToArticle(value: ArticleDTO | undefined) {
    if (!value) throw Error('No article but should be');
    await this.router.navigate([value.Url], {relativeTo: this.activatedRoute});
    this.articleStore.setArticle(value);
  }
}
