import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ArticleDTO, SfArticleTableComponent, SfIcons, SfTripTableComponent, TripDTO} from '@sf/sf-base';
import {loadArticleList, loadTripList, selectAllArticles, selectAllTrips} from '@sf/sf-shared';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'sf-backoffice-main-page-view',
  imports: [
    SfArticleTableComponent,
    SfTripTableComponent
  ],
  templateUrl: './main-page-view.component.html',
  styleUrl: './main-page-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeMainPageViewComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute);

  public readonly __icons = SfIcons;
  public readonly __articles$$ = signal<ArticleDTO[]>([]);
  public readonly __trips$$ = signal<TripDTO[]>([]);

  constructor() {
    this.store.dispatch(loadArticleList());
    this.store.dispatch(loadTripList());

    this.store.select(selectAllArticles)
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((articles) => this.__articles$$.set(articles))

    this.store.select(selectAllTrips)
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((trips) => this.__trips$$.set(trips))
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }

  __onTripClicked(trip: TripDTO) {
    console.log(trip);

  }
}
