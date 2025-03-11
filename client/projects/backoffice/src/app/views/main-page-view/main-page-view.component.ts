import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  ArticleDTO,
  SfArticleTableComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfTripTableComponent,
  TripDTO
} from '@sf/sf-base';
import {loadArticleList, loadTripList, selectAllArticles, selectAllTrips, selectLoading} from '@sf/sf-shared';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {NzCardComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'sf-backoffice-main-page-view',
  imports: [
    SfArticleTableComponent,
    SfTripTableComponent,
    NzCardComponent,
    SfIconAndTextComponent
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
  public readonly __loading$$ = signal<boolean>(true);

  constructor() {
    this.store.dispatch(loadArticleList());
    this.store.dispatch(loadTripList());

    this.store.select(selectAllArticles)
      .pipe(takeUntilDestroyed())
      .subscribe((articles) => {
        this.__articles$$.set(articles);
        this.__loading$$.set(false);
      })

    this.store.select(selectAllTrips)
      .pipe(takeUntilDestroyed())
      .subscribe((trips) => {
        this.__trips$$.set(trips);
        this.__loading$$.set(false);
      });

    this.store.select(selectLoading)
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => this.__loading$$.set(loading));
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }

  __onTripClicked(trip: TripDTO) {
    console.log(trip);

  }
}
