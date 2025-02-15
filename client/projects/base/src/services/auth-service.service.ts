import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';
  private token: string | undefined;

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post(`${this.apiUrl}/login`, {username, password}) as Observable<LoginResponse>;
  }

  public saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public isAuthenticated() {
    return !!this.getToken();
  }
}
