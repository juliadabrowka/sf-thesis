import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {sfAppRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {provideQuillConfig} from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzI18n(en_US),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(sfAppRoutes),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],

          [{'header': 1}, {'header': 2}, {'header': 3}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],

          [{'size': ['small', false, 'large', 'huge']}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'font': []}],
          [{'align': []}],

          ['link', 'image', 'video']
        ],
      },
      theme: 'snow'
    })
  ],
};
