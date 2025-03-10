import {ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {ArticleDTO, SfArticleFormComponent, SfButtonComponent} from '@sf/sf-base';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {createArticle, loadArticleDetails, selectCurrentArticle} from '@sf/sf-shared';

@Component({
  selector: 'sf-backoffice-article',
  imports: [
    SfButtonComponent,
    SfArticleFormComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class SfBackofficeArticleComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  public readonly __article$$ = signal<ArticleDTO | undefined>(undefined);


  constructor() {
    this.store.select(selectCurrentArticle)
      .pipe(
        takeUntilDestroyed())
      .subscribe(article => {
        this.__article$$.set(article);
        this.cdr.markForCheck();
      });

    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        if (params.get('articleId')) {
          const id = Number(params.get('articleId'));
          this.store.dispatch(loadArticleDetails({id}));

          this.cdr.markForCheck();
        }
      });
  }

  __onSaveClick() {
    const article = this.__article$$();
    if (article) this.store.dispatch(createArticle({article}))
  }

  __onCreateClick() {
    console.log("create", this.__article$$())
  }
}
