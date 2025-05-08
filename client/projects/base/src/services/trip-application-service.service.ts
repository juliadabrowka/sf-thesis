import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../sf/src/app/environments/environment';
import { AutosaveRequestDTO, TripApplicationDTO } from '@sf/sf-base';

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

  public updateTripApplication(tripApplicationDto: TripApplicationDTO) {
    return this.http.post<TripApplicationDTO>(
      this.apiUrl + '/updateTripApplication',
      tripApplicationDto,
    );
  }

  getTripApplications() {
    return this.http.get<TripApplicationDTO[]>(
      this.apiUrl + '/tripApplicationList',
    );
  }

  getTripApplicationDetails(tripApplicationId: number) {
    return this.http.get<TripApplicationDTO>(
      `${this.apiUrl}/tripApplications/${tripApplicationId}`,
    );
  }

  deleteTripApplications(tripApplicationIds: number[]) {
    return this.http.post(
      this.apiUrl + `/deleteTripApplications`,
      tripApplicationIds,
    );
  }

  getTripApplicationByHash(hash: string) {
    return this.http.get<TripApplicationDTO>(
      this.apiUrl + '/tripApplication/' + hash,
    );
  }

  autosaveApplication(payload: AutosaveRequestDTO) {
    return this.http.post<AutosaveRequestDTO>(
      this.apiUrl + `/autosave`,
      payload,
    );
  }

  submitApplication(payload: AutosaveRequestDTO) {
    return this.http.post<AutosaveRequestDTO>(this.apiUrl + `/submit`, payload);
  }
}
