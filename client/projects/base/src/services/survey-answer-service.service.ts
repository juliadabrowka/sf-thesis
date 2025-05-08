import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../sf/src/app/environments/environment';
import { SurveyAnswerDTO } from '@sf/sf-base';

@Injectable({
  providedIn: 'root',
})
export class SurveyAnswerServiceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getSurveyAnswers() {
    return this.http.get<SurveyAnswerDTO[]>(this.apiUrl + '/surveyAnswerList');
  }
}
