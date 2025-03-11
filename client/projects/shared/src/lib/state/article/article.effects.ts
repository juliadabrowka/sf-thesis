import {
  createArticle,
  createArticleFailure,
  createArticleSuccess,
  deleteArticles,
  deleteArticlesFailure,
  deleteArticlesSuccess,
  loadArticleDetails,
  loadArticleFailure,
  loadArticleList,
  loadArticleListFailure,
  loadArticleListSuccess,
  loadArticleSuccess,
  setArticle,
  updateArticle,
  updateArticleFailure,
  updateArticleSuccess
} from './article.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ArticleDTO, ArticleService} from '@sf/sf-base';
import {inject} from '@angular/core';

export class ArticleEffects {
  private readonly actions = inject(Actions);
  private readonly articleService = inject(ArticleService);

  createArticle$ = createEffect(() =>
    this.actions.pipe(
      ofType(createArticle),
      mergeMap(({article}) =>
        this.articleService.createArticle(article).pipe(
          map((createdArticle: ArticleDTO) => {
            console.log(createdArticle);
            return createArticleSuccess({article: createdArticle})
          }),
          catchError(error => of(createArticleFailure({error})))
        ))
    ));

  updateArticle$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateArticle),
      mergeMap(({article}) =>
        this.articleService.updateArticle(article).pipe(
          map((updatedArticle: ArticleDTO) => updateArticleSuccess({article: updatedArticle})),
          catchError(error => of(updateArticleFailure({error})))
        ))
    ));

  deleteArticle$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteArticles),
      mergeMap(({ids}) =>
        this.articleService.deleteArticles(ids).pipe(
          map((result => deleteArticlesSuccess)),
          catchError(error => of(deleteArticlesFailure({error})))
        ))
    ));

  loadArticleDetails$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadArticleDetails),
      mergeMap(({id}) =>
        this.articleService.getArticleDetails(id).pipe(
          mergeMap(article => [
            setArticle({article}),
            loadArticleSuccess({article})
          ]),
          catchError(error => of(loadArticleFailure({error})))
        )
      )
    )
  );

  loadArticles$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadArticleList),
      mergeMap(() =>
        this.articleService.getArticles().pipe(
          map((articles) => loadArticleListSuccess({articles})),
          catchError(error => of(loadArticleListFailure({error})))
        )
      )
    )
  );
}
