import {TripDTO, TripService} from '@sf/sf-base';
import {inject} from '@angular/core';
import {SelectEntityId, withEntities} from '@ngrx/signals/entities';
import {signalStore, withMethods, withProps, withState} from '@ngrx/signals';

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
  withMethods(({tripService, ...store}) => ({}))
)
