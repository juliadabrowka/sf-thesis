import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ArticleDTO, SfArticleFormComponent, SfButtonComponent} from '@sf/sf-base';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {createArticle, loadArticleDetails} from '@sf/sf-shared';
import {selectCurrentArticle} from '../../../../../shared/src/lib/state/articles/articles.selectors';

@Component({
  selector: 'sf-backoffice-article',
  imports: [
    SfButtonComponent,
    SfArticleFormComponent,
    JsonPipe
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class SfBackofficeArticleComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  public readonly __article$ = new BehaviorSubject<ArticleDTO | undefined>(undefined);


  constructor() {
    this.store.select(selectCurrentArticle)
      .pipe(
        takeUntilDestroyed())
      .subscribe(article => {
        this.__article$.next(article);
        console.log(article);
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
    const article = this.__article$.value;
    if (article) this.store.dispatch(createArticle({article}))
  }

  __onCreateClick() {
    console.log("create", this.__article$.value)
  }
}
