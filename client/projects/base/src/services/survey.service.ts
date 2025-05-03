import { inject, Injectable } from '@angular/core';
import { environment } from '../../../sf/src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SurveyDTO } from '@sf/sf-base';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getSurveys() {
    return this.http.get<SurveyDTO[]>(this.apiUrl + '/surveyList');
  }

  getSurveyDetails(surveyId: number) {
    return this.http.get<SurveyDTO>(`${this.apiUrl}/surveys/${surveyId}`);
  }

  createSurvey(surveyDTO: SurveyDTO) {
    return this.http.post<SurveyDTO>(this.apiUrl + '/createSurvey', surveyDTO);
  }

  updateSurvey(surveyDto: SurveyDTO) {
    return this.http.post<SurveyDTO>(this.apiUrl + '/updateSurvey', surveyDto);
  }

  deleteSurveys(surveyIds: number[]) {
    return this.http.post(this.apiUrl + `/deleteSurveys`, surveyIds);
  }

  getSurveyByHash(hash: string) {
    return this.http.get<SurveyDTO>(this.apiUrl + '/survey/' + hash);
  }
}
