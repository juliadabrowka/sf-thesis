import {TripDTO} from '@sf/sf-base';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';

export interface SfTripState extends EntityState<TripDTO> {
  trips: TripDTO[];
  trip: TripDTO | undefined;
  loading: boolean;
  error: any;
}

export const tripAdapter = createEntityAdapter<TripDTO>({
  selectId: (trip: TripDTO) => trip.Id ?? -1
});

export const tripState: SfTripState = tripAdapter.getInitialState({
  trips: [],
  trip: undefined,
  loading: false,
  error: null
});

@Injectable()
export class TripState extends ComponentStore<SfTripState> {
  constructor() {
    super(tripState);
  }
}
