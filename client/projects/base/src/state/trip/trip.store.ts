import {TripDTO, TripService} from '@sf/sf-base';
import {computed, inject} from '@angular/core';
import {addEntity, SelectEntityId, updateEntity, withEntities} from '@ngrx/signals/entities';
import {patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {firstValueFrom} from 'rxjs';

export interface SfTripState {
  trips: TripDTO[];
  trip: TripDTO | undefined;
  loading: boolean;
  error: any;
}

export const tripState: SfTripState = {
  trips: [],
  trip: undefined,
  loading: false,
  error: null
};

const selectId: SelectEntityId<TripDTO> = (trip) => trip.Id ?? -1;


export const TripStore = signalStore(
  {providedIn: 'root'},
  withEntities<TripDTO>(),
  withState(tripState),
  withProps(() => ({tripService: inject(TripService)})),
  withComputed((store) => ({
    tripList: computed(() => store.trips)
  })),
  withMethods((store) => ({
    async createTrip(trip: TripDTO) {
      patchState(store, {loading: true});
      const createTripApiCall$ = await store.tripService.createTrip(trip);
      const createdTrip = await firstValueFrom(createTripApiCall$);
      patchState(store, addEntity(createdTrip, {selectId}));
      patchState(store, {loading: false})
    },

    async updateTrip(trip: TripDTO) {
      patchState(store, {loading: true});
      const updateTripApiCall$ = await store.tripService.updateTrip(trip);
      const updatedTrip = await firstValueFrom(updateTripApiCall$);
      patchState(
        store,
        updatedTrip.Id !== undefined
          ? updateEntity({
            id: updatedTrip.Id,
            changes: updatedTrip,
          }, {selectId})
          : {trip: undefined, error: 'Failed to update trip: missing Id'}
      );
      patchState(store, {loading: false});
    },

    async loadTripDetails(id: number) {
      patchState(store, {loading: true});
      const loadTripDetailsApiCall$ = await store.tripService.getTripDetails(id);
      const tripDetails = await firstValueFrom(loadTripDetailsApiCall$);
      patchState(store, {trip: tripDetails, loading: false});
    },

    setTrip(trip: TripDTO | undefined) {
      patchState(store, {trip, loading: true});
      patchState(store, {loading: false});
    },

    // async deleteTrips(ids: number[]) {
    //   patchState(store, {loading: true});
    //   const deleteTripApiCall$ = await store.tripService.deleteTrips(ids);
    //   await firstValueFrom(deleteTripApiCall$);
    //   patchState(store, {loading: false});
    // },

    async loadTripList() {
      patchState(store, {loading: true});
      const getTripListApiCall$ = await store.tripService.getTrips();
      const trips = await firstValueFrom(getTripListApiCall$);
      patchState(store, {trips, loading: false})
    },
  })),
  withHooks({
    async onInit(store) {
      await store.loadTripList();
    }
  })
)
