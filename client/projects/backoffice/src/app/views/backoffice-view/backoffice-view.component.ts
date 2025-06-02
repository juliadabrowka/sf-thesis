import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ArticleDTO,
  ArticleStore,
  SfArticleTableComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfTripTableComponent,
} from '@sf/sf-base';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { SfMapArticlesToTrips } from './map-articles-to-trips';

@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    SfArticleTableComponent,
    SfTripTableComponent,
    NzCardComponent,
    SfMapArticlesToTrips,
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore],
})
export class SfBackofficeComponent {
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);

  public readonly icons = SfIcons;
  public readonly articles = this.__articleStore.articles;
  public readonly loading = this.__articleStore.loading;

  async onArticleClicked(article: ArticleDTO) {
    await this.__router.navigate([`articles/${article.Id}`], {
      relativeTo: this.__activatedRoute,
    });
  }
}
