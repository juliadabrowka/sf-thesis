import {ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ArticleDTO, SfArticleTableComponent} from '@sf/sf-base';
import {ActivatedRoute, Router} from '@angular/router';
import {loadArticleList, selectAllArticles} from '@sf/sf-shared';

@Component({
  selector: 'sf-backoffice-article-table',
  imports: [
    SfArticleTableComponent
  ],
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.css'
})
export class SfBackofficeArticleTableComponent {
  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public __articles$$ = signal<ArticleDTO[]>([]);

  constructor() {
    this.store.dispatch(loadArticleList());

    this.store.select(selectAllArticles)
      .pipe(
      takeUntilDestroyed()
    )
      .subscribe((articles) => {
        this.__articles$$.set(articles);

        this.cdr.markForCheck();
      })
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }
}
