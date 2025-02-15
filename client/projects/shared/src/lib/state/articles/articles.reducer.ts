import {createReducer, on} from '@ngrx/store';
import {articleAdapter, initialState} from './articles.store';
import {
  createArticle,
  createArticleFailure,
  createArticleSuccess,
  deleteArticles,
  loadArticleList,
  loadArticleListFailure,
  loadArticleListSuccess,
  setArticle,
  updateArticle
} from './articles.actions';


export const articlesReducer = createReducer(
  initialState,
  on(createArticle, (state, {article}) =>
    articleAdapter.addOne(article, {...state, loading: true, error: null})
  ),

  on(createArticleSuccess, (state, {article}) =>
    ({...state, article, loading: false, error: null})),

  on(createArticleFailure, (state, {error}) =>
    ({...state, loading: false, error})),

  on(updateArticle, (state, {article}) =>
    articleAdapter.updateOne(
      {id: article.Id, changes: article},
      {...state, loading: true, error: null})),

  on(setArticle, (state, {article}) => ({...state, article, loading: true, error: null})),

  on(deleteArticles, (state, {ids}) =>
    articleAdapter.removeMany(ids, {...state, loading: true, error: null})
  ),

  on(loadArticleList, state => ({
    ...state,
    isLoading: true
  })),
  on(loadArticleListSuccess, (state, {articles}) => ({
    ...state,
    articles,
    isLoading: false
  })),
  on(loadArticleListFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error
  }))
);
