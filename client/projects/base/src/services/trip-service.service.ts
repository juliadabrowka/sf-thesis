import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TripDTO} from '../data-types';
import {Observable} from 'rxjs';
import {environment} from '../../../sf/src/app/environments/environment';

@Injectable({providedIn: 'root'})
export class TripService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  public async createTrip(tripDto: TripDTO) {
    return this.http.post(this.apiUrl + '/createTrip', {tripDto}) as Observable<TripDTO>;
  }

  public async updateTrip(tripDto: TripDTO) {
    return this.http.post(this.apiUrl + '/updateTrip', tripDto) as Observable<TripDTO>;
  }

  public async getTrips() {
    return this.http.get(this.apiUrl + '/tripList') as Observable<TripDTO[]>;
  }

  public async getTripDetails(tripId: number) {
    return this.http.get(`${this.apiUrl}/getTripDetails/${tripId}`) as Observable<TripDTO>;
  }
}

