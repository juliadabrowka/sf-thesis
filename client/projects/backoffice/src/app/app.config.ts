import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {backofficeRoutes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {ArticleEffects, articleReducer} from '@sf/sf-shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(backofficeRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore({articles: articleReducer}),
    provideEffects([ArticleEffects]),
  ]
};
