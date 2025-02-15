// ARTICLE
import {createAction, props} from '@ngrx/store';
import {ArticleDTO} from '@sf/sf-base';

export const createArticle = createAction(
  '[Article] Create Article',
  props<{ article: ArticleDTO }>()
);

export const createArticleSuccess = createAction(
  '[Article] Create Article Success',
  props<{ article: ArticleDTO }>()
);

export const createArticleFailure = createAction(
  '[Article] Create Article Failure',
  props<{ error: any }>()
);

// update
export const updateArticle = createAction(
  '[Article] Update Article',
  props<{ article: ArticleDTO }>()
);
export const updateArticleSuccess = createAction(
  '[Article] Update Article Success',
  props<{ article: ArticleDTO }>()
);
export const updateArticleFailure = createAction(
  '[Article] Update Article Failure',
  props<{ error: any }>()
);

export const setArticle = createAction(
  '[Article] Set Article',
  props<{ article: ArticleDTO | undefined }>()
);

// ARTICLE
export const loadArticle = createAction(
  '[Article] Load Single Article Success',
  props<{ article: ArticleDTO }>()
);

export const loadArticleSuccess = createAction(
  '[Article] Load Single Article',
  props<{ article: ArticleDTO }>());

export const loadArticleDetails = createAction(
  '[Article] Load Article Details',
  props<{ id: number }>());


export const loadArticleFailure = createAction(
  '[Article] Load Article Failure',
  props<{ error: any }>()
);


// ARTICLES

export const deleteArticles = createAction(
  '[Articles] Delete Articles',
  props<{ ids: number[] }>()
);

export const deleteArticlesSuccess = createAction(
  '[Article] Load Article Success',
  props<{ message: any }>()
);
export const deleteArticlesFailure = createAction(
  '[Article] Load Article Failure',
  props<{ error: any }>()
);

export const loadArticleList = createAction(
  '[Article] Load Articles');

export const loadArticleListSuccess = createAction(
  '[Article] Load Articles Success',
  props<{ articles: ArticleDTO[] }>()
);

export const loadArticleListFailure = createAction(
  '[Article] Load Articles Failure',
  props<{ error: any }>()
);
