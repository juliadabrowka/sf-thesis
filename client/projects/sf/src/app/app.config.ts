import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {sfAppRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {ArticleStore, TripStore} from '@sf/sf-base';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzI18n(en_US),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(sfAppRoutes),
    provideAppInitializer(() => {
      const articleStore = inject(ArticleStore);
      const tripStore = inject(TripStore);
      return new Promise<void>((resolve, reject) => {
        try {
          Promise.all([
            articleStore.loadArticleList(),
            tripStore.loadTripList()
          ])
            .then(() => resolve())
        } catch (e) {
          reject(e)
        }
      })

    })
  ],
};
