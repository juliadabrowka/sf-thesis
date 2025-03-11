import {createReducer, on} from '@ngrx/store';
import {
  createTrip,
  createTripFailure,
  createTripSuccess,
  deleteTrips,
  loadTripList,
  loadTripListFailure,
  loadTripListSuccess,
  setTrip,
  updateTrip
} from './trip.actions';
import {tripAdapter, tripState} from './trip.state';


export const tripReducer = createReducer(
  tripState,
  on(createTrip, (state, {trip}) =>
    tripAdapter.addOne(trip, {...state, loading: true, error: null})
  ),

  on(createTripSuccess, (state, {trip}) =>
    ({...state, trip, loading: false, error: null})),

  on(createTripFailure, (state, {error}) =>
    ({...state, loading: false, error})),

  on(updateTrip, (state, {trip}) =>
    trip.Id
      ? tripAdapter.updateOne(
        {id: trip.Id, changes: trip},
        {...state, loading: true, error: null})
      : state
  ),

  on(setTrip, (state, {trip}) => ({...state, trip, loading: true, error: null})),

  on(deleteTrips, (state, {ids}) =>
    tripAdapter.removeMany(ids, {...state, loading: true, error: null})
  ),

  on(loadTripList, state => ({
    ...state,
    isLoading: true
  })),
  on(loadTripListSuccess, (state, {trips}) => ({
    ...state,
    trips,
    isLoading: false
  })),
  on(loadTripListFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error
  }))
);
