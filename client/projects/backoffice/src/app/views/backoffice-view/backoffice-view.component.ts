import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleDTO, SfArticleTableComponent, SfIconAndTextComponent, SfIcons, SfTripTableComponent} from '@sf/sf-base';
import {SfBackofficeFilterOutTripsPipe} from './backoffice-view-filter-out-trips.pipe';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {ArticleStore} from '../../../../../base/src/state/article/article.store';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    SfArticleTableComponent,
    SfTripTableComponent,
    SfBackofficeFilterOutTripsPipe,
    NzCardComponent,
    JsonPipe
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly route = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);

  public readonly __icons = SfIcons;
  public readonly __articles$$ = this.articleStore.articles();
  //public readonly __trips$$ = signal<TripDTO[]>([]);
  public readonly __loading$$ = this.articleStore.loading();

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }

  __onTripClicked(trip: ArticleDTO) {
    console.log(trip);
  }
}
