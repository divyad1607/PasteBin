import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  //REGISTER
  register(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  //LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }
}
