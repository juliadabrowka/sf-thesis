import { TripApplicationDTO } from '@sf/sf-base';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import {
  addEntity,
  SelectEntityId,
  withEntities,
} from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { TripApplicationService } from '../services/trip-application-service.service';

type SfTripApplicationState = {
  tripApplication: TripApplicationDTO | undefined;
  tripApplications: TripApplicationDTO[];
  loading: boolean;
  error: any;
};

const initialTripApplicationState: SfTripApplicationState = {
  tripApplication: undefined,
  tripApplications: [],
  loading: false,
  error: null,
};

const selectId: SelectEntityId<TripApplicationDTO> = (tripApplication) =>
  tripApplication.Id ?? -1;

export const TripApplicationStore = signalStore(
  { providedIn: 'root' },
  withState(initialTripApplicationState),
  withEntities<TripApplicationDTO>(),
  withProps(() => ({
    tripApplicationService: inject(TripApplicationService),
  })),
  withMethods((store) => ({
    async loadTripApplicationList() {
      patchState(store, { loading: true });
      const tripApplications = await firstValueFrom(
        store.tripApplicationService.getTripApplications(),
      );
      patchState(store, { tripApplications, loading: false });
    },

    async createTripApplication(tripApplication: TripApplicationDTO) {
      patchState(store, { loading: true });
      const newTripApplication = await firstValueFrom(
        store.tripApplicationService.createTripApplication(tripApplication),
      );
      patchState(
        store,
        addEntity(newTripApplication, { selectId: (s) => s.Id ?? -1 }),
      );
      await this.loadTripApplicationList();
      patchState(store, { loading: false });
    },

    async loadTripApplicationById(tripApplicationId: number) {
      patchState(store, { loading: true });
      const loadTripApplicationByIdApiCall$ =
        store.tripApplicationService.getTripApplicationDetails(
          tripApplicationId,
        );
      const tripApplication = await firstValueFrom(
        loadTripApplicationByIdApiCall$,
      );

      this.setTripApplication(tripApplication);
    },

    setTripApplication(tripApplication: TripApplicationDTO | undefined) {
      patchState(store, { tripApplication, loading: true });
      patchState(store, { loading: false });
    },

    async deleteTripApplications(tripApplicationIds: number[]) {
      patchState(store, { loading: true });
      const deleteTripApplicationsApiCall$ =
        store.tripApplicationService.deleteTripApplications(tripApplicationIds);
      await firstValueFrom(deleteTripApplicationsApiCall$);
      patchState(store, { loading: false });
    },

    async getTripApplicationByHash(hash: string) {
      patchState(store, { loading: true });
      const getTripApplicationByHashApiCall$ =
        store.tripApplicationService.getTripApplicationByHash(hash);
      const tripApplication = await firstValueFrom(
        getTripApplicationByHashApiCall$,
      );

      this.setTripApplication(tripApplication);
    },

    async updateTripApplication(tripApplication: TripApplicationDTO) {
      patchState(store, { loading: true });
      const updateTripApplicationApiCall$ =
        store.tripApplicationService.updateTripApplication(tripApplication);
      await firstValueFrom(updateTripApplicationApiCall$);
      await this.loadTripApplicationList();
      patchState(store, { loading: false });
    },
  })),
);
