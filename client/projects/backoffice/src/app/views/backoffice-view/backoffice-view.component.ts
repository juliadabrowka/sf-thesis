import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ArticleDTO,
  SfArticleTableComponent,
  SfIconAndTextComponent,
  SfIcons,
  SfTripTableComponent,
  TripDTO
} from '@sf/sf-base';
import {Store} from '@ngrx/store';
import {loadArticleList, loadTripList, selectAllArticles, selectLoading} from '@sf/sf-shared';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'sf-backoffice-view',
  imports: [
    SfIconAndTextComponent,
    NzCardComponent,
    SfArticleTableComponent,
    SfTripTableComponent
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeComponent {
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
        //this.__trips$$.set(trips)
        this.__loading$$.set(false);
      })

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
