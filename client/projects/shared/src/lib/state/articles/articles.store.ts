import {Injectable, signal} from '@angular/core';
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

export const initialState: SfArticleState = articleAdapter.getInitialState({
  articles: [],
  article: undefined,
  loading: false,
  error: null
});

@Injectable()
export class ArticlesStore extends ComponentStore<SfArticleState> {
  constructor() {
    super(initialState);
  }

  readonly articles$ = signal(this.select(state => state.articles));
  readonly selectedArticle$ = signal(this.select(state => state.article));
}
