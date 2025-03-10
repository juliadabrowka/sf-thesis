import {ArticleEffects, articleReducer, TripEffects, tripReducer} from '@sf/sf-shared';

export const sfReducers = {
  articles: articleReducer,
  trips: tripReducer
};

export const sfEffects = [
  ArticleEffects,
  TripEffects
]
