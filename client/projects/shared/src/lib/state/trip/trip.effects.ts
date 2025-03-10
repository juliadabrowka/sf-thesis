import {catchError, map, mergeMap, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TripDTO, TripService} from '@sf/sf-base';
import {inject} from '@angular/core';
import {
  createTrip,
  createTripFailure,
  createTripSuccess,
  loadTripDetails,
  loadTripFailure,
  loadTripList,
  loadTripListFailure,
  loadTripListSuccess,
  loadTripSuccess,
  setTrip,
  updateTrip,
  updateTripFailure,
  updateTripSuccess
} from './trip.actions';

export class TripEffects {
  private readonly actions = inject(Actions);
  private readonly tripService = inject(TripService);

  createTrip$ = createEffect(() =>
    this.actions.pipe(
      ofType(createTrip),
      mergeMap(({trip}) =>
        this.tripService.createTrip(trip).pipe(
          map((createdTrip: TripDTO) => createTripSuccess({trip: createdTrip})),
          catchError(error => of(createTripFailure({error})))
        ))
    ));

  updateTrip$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateTrip),
      mergeMap(({trip}) =>
        this.tripService.updateTrip(trip).pipe(
          map((updatedTrip) => updateTripSuccess({trip: updatedTrip})),
          catchError(error => of(updateTripFailure({error})))
        ))
    ));

  // deleteTrip$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(deleteTrips),
  //     mergeMap(({ids}) =>
  //       this.tripService(ids).pipe(
  //         map((result => deleteTripsSuccess)),
  //         catchError(error => of(deleteTripsFailure({error})))
  //       ))
  //   ));

  loadTripDetails$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTripDetails),
      mergeMap(({id}) =>
        this.tripService.getTripDetails(id).pipe(
          mergeMap(trip => [
            setTrip({trip}),
            loadTripSuccess({trip})
          ]),
          catchError(error => of(loadTripFailure({error})))
        )
      )
    )
  );

  loadTrips$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTripList),
      mergeMap(() =>
        this.tripService.getTrips().pipe(
          map((trips) => loadTripListSuccess({trips})),
          catchError(error => of(loadTripListFailure({error})))
        )
      )
    )
  );
}
