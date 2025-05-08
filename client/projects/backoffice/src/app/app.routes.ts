import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { SfBackofficeTripViewComponent } from './views/trip-view/trip-view.component';
import { SfBackofficeArticleViewComponent } from './views/article-view/article-view.component';
import { SfBackofficeComponent } from './views/backoffice-view/backoffice-view.component';
import { AppComponent } from './app.component';
import { ArticleCategory, SfIcons, TripType } from '@sf/sf-base';
import { SfFilteredTableViewComponent } from './views/filtered-table-view/filtered-table-view.component';
import { SfBackofficeSurveyListComponent } from './views/survey-view/survey-list/survey-list.component';
import { SfBackofficeSurveyViewComponent } from './views/survey-view/survey-view.component';
import { SfTripApplicationListComponent } from '../../../base/src/lib/trip/trip-application-list/trip-application-list.component';

const filteredTableRoutes: Routes = [
  {
    path: 'recommendations',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Rekomendacje,
      title: 'Rekomendacje',
      icon: SfIcons.recommendations,
    },
  },
  {
    path: 'tips',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Ciekawostki,
      title: 'Ciekawostki',
      icon: SfIcons.tips,
    },
  },
  {
    path: 'photo-stories',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Fotorelacje,
      title: 'Fotorelacje',
      icon: SfIcons.photoRel,
    },
  },
  {
    path: 'classic-trips',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Wyprawy,
      tripFilter: TripType.Classic,
      title: 'Wyprawy classic',
      icon: SfIcons.classicTrip,
    },
  },
  {
    path: 'weekend-trips',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Wyprawy,
      tripFilter: TripType.Weekend,
      title: 'Weekendowe wojaże',
      icon: SfIcons.weekendTrip,
    },
  },
  {
    path: 'bike-trips',
    component: SfFilteredTableViewComponent,
    data: {
      categoryFilter: ArticleCategory.Wyprawy,
      tripFilter: TripType.Bike,
      title: 'Wyprawy rowerowe',
      icon: SfIcons.bikeTrip,
    },
  },
];

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: SfBackofficeComponent,
      },
      {
        path: 'articles/:articleId',
        component: SfBackofficeArticleViewComponent,
      },
      {
        path: 'create-article',
        component: SfBackofficeArticleViewComponent,
      },
      {
        path: 'create-trip',
        component: SfBackofficeTripViewComponent,
      },
      {
        path: 'create-survey',
        component: SfBackofficeSurveyViewComponent,
      },
      {
        path: 'surveys',
        component: SfBackofficeSurveyListComponent,
      },
      { path: 'surveys/:surveyId', component: SfBackofficeSurveyViewComponent },
      {
        path: 'trip-applications',
        component: SfTripApplicationListComponent,
      },
      ...filteredTableRoutes,
    ],
  },
];
