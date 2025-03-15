import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ArticleDTO,
  ArticleStore,
  SfArticleTableComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfTripTableComponent
} from '@sf/sf-base';
import {SfBackofficeFilterOutTripsPipe} from './backoffice-view-filter-out-trips.pipe';
import {NzCardComponent} from 'ng-zorro-antd/card';


@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    SfArticleTableComponent,
    SfTripTableComponent,
    SfBackofficeFilterOutTripsPipe,
    NzCardComponent
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
  public readonly __articles$$ = computed(() => this.articleStore.articles())
  public readonly __articles = signal<ArticleDTO[]>([])
  //public readonly __trips$$ = signal<TripDTO[]>([]);
  public readonly __loading$$ = this.articleStore.loading();

  constructor() {
    this.articleStore.loadArticleList();
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }

  __onTripClicked(trip: ArticleDTO) {
    console.log(trip);
  }
}
