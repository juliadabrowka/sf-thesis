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

@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    SfArticleTableComponent,
    SfTripTableComponent,
    NzCardComponent,
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore],
})
export class SfBackofficeComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);

  public readonly __icons = SfIcons;
  public readonly __articles$$ = this.articleStore.articles;
  public readonly __loading$$ = this.articleStore.loading;

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {
      relativeTo: this.route,
    });
  }
}
