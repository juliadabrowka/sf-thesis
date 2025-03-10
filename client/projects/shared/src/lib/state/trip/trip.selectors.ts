import {SfTripState} from './trip.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export const selectTrips = createFeatureSelector<SfTripState>('trip');

export const selectAllTrips = createSelector(
  selectTrips,
  (state) => state?.trips,
);

export const selectCurrentTrip = createSelector(
  selectTrips,
  (state) => state?.trip
);
