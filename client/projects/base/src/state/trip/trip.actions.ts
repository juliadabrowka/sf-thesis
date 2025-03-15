// // ARTICLE
// import {createAction, props} from '@ngrx/store';
// import {TripDTO} from '@sf/sf-base';
//
// export const createTrip = createAction(
//   '[Trip] Create Trip',
//   props<{ trip: TripDTO }>()
// );
//
// export const createTripSuccess = createAction(
//   '[Trip] Create Trip Success',
//   props<{ trip: TripDTO }>()
// );
//
// export const createTripFailure = createAction(
//   '[Trip] Create Trip Failure',
//   props<{ error: any }>()
// );
//
// // update
// export const updateTrip = createAction(
//   '[Trip] Update Trip',
//   props<{ trip: TripDTO }>()
// );
// export const updateTripSuccess = createAction(
//   '[Trip] Update Trip Success',
//   props<{ trip: TripDTO }>()
// );
// export const updateTripFailure = createAction(
//   '[Trip] Update Trip Failure',
//   props<{ error: any }>()
// );
//
// export const setTrip = createAction(
//   '[Trip] Set Trip',
//   props<{ trip: TripDTO | undefined }>()
// );
//
// // ARTICLE
// export const loadTrip = createAction(
//   '[Trip] Load Single Trip Success',
//   props<{ trip: TripDTO }>()
// );
//
// export const loadTripSuccess = createAction(
//   '[Trip] Load Single Trip',
//   props<{ trip: TripDTO }>());
//
// export const loadTripDetails = createAction(
//   '[Trip] Load Trip Details',
//   props<{ id: number }>());
//
//
// export const loadTripFailure = createAction(
//   '[Trip] Load Trip Failure',
//   props<{ error: any }>()
// );
//
//
// // ARTICLES
//
// export const deleteTrips = createAction(
//   '[Trips] Delete Trips',
//   props<{ ids: number[] }>()
// );
//
// export const deleteTripsSuccess = createAction(
//   '[Trip] Load Trip Success',
//   props<{ message: any }>()
// );
// export const deleteTripsFailure = createAction(
//   '[Trip] Load Trip Failure',
//   props<{ error: any }>()
// );
//
// export const loadTripList = createAction(
//   '[Trip] Load Trips');
//
// export const loadTripListSuccess = createAction(
//   '[Trip] Load Trips Success',
//   props<{ trips: TripDTO[] }>()
// );
//
// export const loadTripListFailure = createAction(
//   '[Trip] Load Trips Failure',
//   props<{ error: any }>()
// );
