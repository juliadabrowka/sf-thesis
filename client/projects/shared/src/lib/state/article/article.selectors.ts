import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SfArticleState} from './article.state';

export const selectArticles = createFeatureSelector<SfArticleState>('articles');

export const selectAllArticles = createSelector(
  selectArticles,
  (state) => state?.articles
);

export const selectCurrentArticle = createSelector(
  selectArticles,
  (state) => state?.article
);

export const selectLoading = createSelector(
  selectArticles,
  (state) => state.loading
)
