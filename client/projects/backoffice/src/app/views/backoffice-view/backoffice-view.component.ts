import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ArticleDTO,
  ArticleStore,
  SfArticleTableComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfTripTableComponent,
  TripDTO,
  TripStore
} from '@sf/sf-base';
import {NzCardComponent} from 'ng-zorro-antd/card';


@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    SfArticleTableComponent,
    SfTripTableComponent,
    NzCardComponent
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore, TripStore]
})
export class SfBackofficeComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly route = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);
  private readonly tripStore = inject(TripStore);

  public readonly __icons = SfIcons;
  public readonly __articles$$ = computed(() => this.articleStore.articles())
  public readonly __trips$$ = computed(() => this.tripStore.trips());
  public readonly __loading$$ = computed(() => this.articleStore.loading());

  constructor() {
    this.articleStore.loadArticleList();
    this.tripStore.loadTripList();
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }

  async __onTripClicked(trip: TripDTO) {
    await this.router.navigate([`articles/${trip.ArticleId}`], {relativeTo: this.route});
  }
}
