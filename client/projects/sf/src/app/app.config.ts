import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { sfAppRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideQuillConfig } from 'ngx-quill';
import { ArticleStore, SurveyStore } from '@sf/sf-base';
import { TripApplicationStore } from '../../../base/src/state/trip-application-store';

const initializeAppFn = async () => {
  const articleStore = inject(ArticleStore);
  const surveyStore = inject(SurveyStore);
  const tripStore = inject(TripApplicationStore);

  await Promise.all([
    articleStore.loadArticleList(),
    surveyStore.loadSurveyList(),
    tripStore.loadTripApplicationList(),
  ]);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzI18n(en_US),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(
      sfAppRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideQuillConfig({ theme: 'snow' }),
    provideAppInitializer(() => {
      return initializeAppFn();
    }),
  ],
};
