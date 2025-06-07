import {
  ApplicationConfig,
  inject,
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

const initializerFnArticleStore = async () => {
  const articleStore = inject(ArticleStore);

  return articleStore.loadArticleList();
};
const initializerFnSurveyStore = async () => {
  const surveyStore = inject(SurveyStore);

  return surveyStore.loadSurveyList();
};
const initializerFnTripStore = async () => {
  const tripStore = inject(TripApplicationStore);

  return tripStore.loadTripApplicationList();
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
  ],
};
