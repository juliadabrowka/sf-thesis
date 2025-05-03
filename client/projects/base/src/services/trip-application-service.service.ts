import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../sf/src/app/environments/environment';
import { TripApplicationDTO } from '@sf/sf-base';

@Injectable({
  providedIn: 'root',
})
export class TripApplicationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  createTripApplication(tripApplicationDto: TripApplicationDTO) {
    return this.http.post<TripApplicationDTO>(
      this.apiUrl + '/createTripApplication',
      tripApplicationDto,
    );
  }
}
