import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../sf/src/app/environments/environment';

@Injectable({providedIn: 'root'})
export class UploadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public uploadFile(file: File) {
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/uploadImage`, file);
  }
}
