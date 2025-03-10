import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ArticleDTO} from '@sf/sf-base';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface SfArticleState extends EntityState<ArticleDTO> {
  articles: ArticleDTO[];
  article: ArticleDTO | undefined;
  loading: boolean;
  error: any;
}

export const articleAdapter = createEntityAdapter<ArticleDTO>({
  selectId: (article: ArticleDTO) => article.Id
});

export const articleState: SfArticleState = articleAdapter.getInitialState({
  articles: [],
  article: undefined,
  loading: false,
  error: null
});

@Injectable()
export class ArticleState extends ComponentStore<SfArticleState> {
  constructor() {
    super(articleState);
  }
}
