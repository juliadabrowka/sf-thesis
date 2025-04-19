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

  public getSurveys() {
    return this.http.get<SurveyDTO[]>(this.apiUrl + '/surveyList');
  }

  public getSurveyDetails(surveyId: number) {
    return this.http.get<SurveyDTO>(`${this.apiUrl}/survey/${surveyId}`);
  }

  public createSurvey(surveyDTO: SurveyDTO) {
    return this.http.post<SurveyDTO>(this.apiUrl + '/createSurvey', surveyDTO);
  }

  updateSurvey(surveyDto: SurveyDTO) {
    return this.http.post<SurveyDTO>(this.apiUrl + '/updateSurvey', surveyDto);
  }

  deleteSurveys(surveyIds: number[]) {
    return this.http.post(this.apiUrl + `/deleteSurveys`, surveyIds);
  }
}
