import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { SurveyDTO } from '@sf/sf-base';
import { SurveyService } from '../services/survey.service';
import { firstValueFrom } from 'rxjs';
import {
  addEntity,
  SelectEntityId,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';

type SfSurveyState = {
  survey: SurveyDTO | undefined;
  surveys: SurveyDTO[];
  loading: boolean;
  error: any;
};

const initialSurveyState: SfSurveyState = {
  survey: undefined,
  surveys: [],
  loading: false,
  error: null,
};

const selectId: SelectEntityId<SurveyDTO> = (survey) => survey.Id ?? -1;

export const SurveyStore = signalStore(
  { providedIn: 'root' },
  withState(initialSurveyState),
  withEntities<SurveyDTO>(),
  withProps(() => ({
    surveyService: inject(SurveyService),
  })),
  withMethods((store) => ({
    async loadSurveyList() {
      patchState(store, { loading: true });
      const surveys = await firstValueFrom(store.surveyService.getSurveys());
      patchState(store, { surveys, loading: false });
    },

    async createSurvey(survey: SurveyDTO) {
      patchState(store, { loading: true });
      const newSurvey = await firstValueFrom(
        store.surveyService.createSurvey(survey),
      );
      patchState(store, addEntity(newSurvey, { selectId: (s) => s.Id ?? -1 }));
      patchState(store, { loading: false });
    },

    async updateSurvey(survey: SurveyDTO) {
      patchState(store, { loading: true });
      const updateSurveyApiCall$ = store.surveyService.updateSurvey(survey);
      const updatedSurvey = await firstValueFrom(updateSurveyApiCall$);
      patchState(
        store,
        updatedSurvey.Id !== undefined
          ? updateEntity(
              {
                id: updatedSurvey.Id,
                changes: updatedSurvey,
              },
              { selectId },
            )
          : {
              survey: undefined,
              error: 'Failed to update survey: missing Id',
            },
      );
      patchState(store, { loading: false });
    },

    setSurvey(survey: SurveyDTO | undefined) {
      patchState(store, { survey, loading: true });
      patchState(store, { loading: false });
    },

    async deleteSurveys(surveyIds: number[]) {
      patchState(store, { loading: true });
      const deleteSurveysApiCall$ =
        store.surveyService.deleteSurveys(surveyIds);
      await firstValueFrom(deleteSurveysApiCall$);
      patchState(store, { loading: false });
    },
  })),
);
