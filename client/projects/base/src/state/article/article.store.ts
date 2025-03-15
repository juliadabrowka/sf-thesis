import {inject} from '@angular/core';
import {ArticleDTO, ArticleService} from '@sf/sf-base';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {firstValueFrom} from 'rxjs';
import {SelectEntityId} from '@ngrx/signals/entities';

type SfArticleState = {
  articles: ArticleDTO[];
  article: ArticleDTO | undefined;
  loading: boolean;
  error: any;
}

const initialState: SfArticleState = {
  articles: [],
  article: undefined,
  loading: false,
  error: null
}

const selectId: SelectEntityId<ArticleDTO> = (article) => article.Id ?? -1;

export const ArticleStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, articleService = inject(ArticleService)) => ({
      async createArticle(article: ArticleDTO) {
        patchState(store, {loading: true});
        const createArticleApiCall$ = await articleService.createArticle(article);
        const createdArticle = await firstValueFrom(createArticleApiCall$);
        //patchState(store, addEntity(createdArticle, { selectId }));
        patchState(store, {loading: false})
      },

      async updateArticle(article: ArticleDTO) {
        patchState(store, {loading: true});
        const updateArticleApiCall$ = await articleService.updateArticle(article);
        const updatedArticle = await firstValueFrom(updateArticleApiCall$);
        // if (updatedArticle?.Id !== undefined) {
        //   patchState(
        //     store,
        //     article: updatedArticle
        //   );
        // }
        patchState(store, {loading: false});
      },

      async loadArticleDetails(id: number) {
        patchState(store, {loading: true});
        const loadArticleDetailsApiCall$ = await articleService.getArticleDetails(id);
        const articleDetails = await firstValueFrom(loadArticleDetailsApiCall$);
        patchState(store, {article: articleDetails, loading: false});
      },

      async setArticle(article: ArticleDTO | undefined) {
        patchState(store, {loading: true});
        patchState(store, {article, loading: false});
      },

      async deleteArticles(ids: number[]) {
        patchState(store, {loading: true});
        const deleteArticleApiCall$ = await articleService.deleteArticles(ids);
        await firstValueFrom(deleteArticleApiCall$);
        patchState(store, {loading: false});
      },

      async loadArticleList() {
        patchState(store, {loading: true});
        const getArticleListApiCall$ = await articleService.getArticles();
        const articles = await firstValueFrom(getArticleListApiCall$);
        patchState(store, {articles, loading: false})
      }
    })
  )
)
