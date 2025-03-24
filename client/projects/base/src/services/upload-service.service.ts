import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../sf/src/app/environments/environment';
import {NzUploadFile} from 'ng-zorro-antd/upload';

@Injectable({providedIn: 'root'})
export class UploadService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public uploadFile(file: NzUploadFile) {
    console.log(file)
    return this.http.post(this.apiUrl + '/uploadImage', file);
  }
}
