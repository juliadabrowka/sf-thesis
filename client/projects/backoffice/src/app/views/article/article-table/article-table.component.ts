import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ArticleDTO, SfArticleTableComponent} from '@sf/sf-base';
import {ActivatedRoute, Router} from '@angular/router';
import {selectAllArticles} from '../../../../../../shared/src/lib/state/articles/articles.selectors';
import {loadArticleList} from '@sf/sf-shared';

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

  public __articles$$ = new BehaviorSubject<ArticleDTO[]>([]);

  constructor() {
    this.store.dispatch(loadArticleList());

    this.store.select(selectAllArticles)
      .pipe(
      takeUntilDestroyed()
    )
      .subscribe((articles) => {
        console.log(articles)
        this.__articles$$.next(articles);
        this.cdr.markForCheck();
      })
  }

  async __onArticleClicked(article: ArticleDTO) {
    await this.router.navigate([`articles/${article.Id}`], {relativeTo: this.route});
  }
}
