import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {sfAppRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {provideStore} from '@ngrx/store';
import {sfEffects, sfReducers} from './app-state';
import {provideEffects} from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzI18n(en_US),
    provideStore(sfReducers),
    provideEffects(sfEffects),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(sfAppRoutes),
  ],
};
