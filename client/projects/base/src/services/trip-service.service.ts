import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TripDTO} from '../data-types';
import {map, Observable} from 'rxjs';
import {environment} from '../../../sf/src/app/environments/environment';

@Injectable({providedIn: 'root'})
export class TripService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  public createTrip(tripDto: TripDTO): Observable<TripDTO> {
    return this.http.post(this.apiUrl + '/createTrip', {tripDto}) as Observable<TripDTO>;
  }
  public updateTrip(tripDto: TripDTO): Observable<void> {
    return this.http.post(this.apiUrl + '/updateTrip', {tripDto}).pipe(map(() => undefined)) as Observable<void>;
  }
  public getTrip(): Observable<TripDTO[]> {
    return this.http.get(this.apiUrl + '/getTrip') as Observable<TripDTO[]>;
  }
  public getTripDetails(tripId: number): Observable<TripDTO> {
    return this.http.get(this.apiUrl + '/getTripDetails/\$\{tripId}') as Observable<TripDTO>;
  }
}

