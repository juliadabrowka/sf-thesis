import {ArticleEffects, articlesReducer} from '@sf/sf-shared';


export const sfReducers = {
  articles: articlesReducer,
};

export const sfEffects = [
  ArticleEffects,
]
