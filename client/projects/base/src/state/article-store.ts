import { computed, inject } from '@angular/core';
import {
  ArticleCategory,
  ArticleDTO,
  ArticleService,
  TripType,
} from '@sf/sf-base';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import {
  addEntity,
  SelectEntityId,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';

type SfArticleState = {
  articles: ArticleDTO[];
  article: ArticleDTO | undefined;
  loading: boolean;
  categoryFilter: ArticleCategory | undefined;
  tripFilter: TripType | undefined;
  error: any;
};

const initialState: SfArticleState = {
  articles: [],
  article: undefined,
  loading: false,
  categoryFilter: undefined,
  tripFilter: undefined,
  error: null,
};

const selectId: SelectEntityId<ArticleDTO> = (article) => article.Id ?? -1;

export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<ArticleDTO>(),
  withProps(() => ({
    articleService: inject(ArticleService),
  })),
  withComputed((store) => ({
    trips: computed(() =>
      store
        .articles()
        .filter((a) => !!a.TripDTO)
        .map((a) => a.TripDTO!),
    ),
  })),
  withMethods((store) => ({
    async createArticle(article: ArticleDTO) {
      patchState(store, { loading: true });
      const createArticleApiCall$ = store.articleService.createArticle(article);
      const createdArticle = await firstValueFrom(createArticleApiCall$);
      patchState(store, addEntity(createdArticle, { selectId }));
      patchState(store, { loading: false });
    },

    async updateArticle(article: ArticleDTO) {
      patchState(store, { loading: true });
      const updateArticleApiCall$ = store.articleService.updateArticle(article);
      const updatedArticle = await firstValueFrom(updateArticleApiCall$);
      patchState(
        store,
        updatedArticle.Id !== undefined
          ? updateEntity(
              {
                id: updatedArticle.Id,
                changes: updatedArticle,
              },
              { selectId },
            )
          : {
              article: undefined,
              error: 'Failed to update article: missing Id',
            },
      );
      patchState(store, { loading: false });
    },

    async getArticleDetails(id: number) {
      patchState(store, { loading: true });
      const loadArticleDetailsApiCall$ =
        store.articleService.getArticleDetails(id);
      const articleDetails = await firstValueFrom(loadArticleDetailsApiCall$);
      this.setArticle(articleDetails);
    },

    setArticle(article: ArticleDTO | undefined) {
      patchState(store, { article, loading: true });
      patchState(store, { loading: false });
    },

    async deleteArticles(articleIds: number[]) {
      patchState(store, { loading: true });
      const deleteArticleApiCall$ =
        store.articleService.deleteArticles(articleIds);
      await firstValueFrom(deleteArticleApiCall$);
      patchState(store, { loading: false });
    },

    async loadArticleList() {
      patchState(store, { loading: true });
      const getArticleListApiCall$ = store.articleService.getArticles();
      const articles = await firstValueFrom(getArticleListApiCall$);
      patchState(store, { articles, loading: false });
    },

    setCategoryFilter(categoryFilter: ArticleCategory) {
      patchState(store, { loading: true, categoryFilter });
      patchState(store, { loading: false });
    },

    setTripFilter(tripFilter: TripType) {
      patchState(store, { loading: true, tripFilter });
      patchState(store, { loading: false });
    },
  })),
  withHooks({
    async onInit(store) {
      await store.loadArticleList();
    },
  }),
);
