import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasteService {

  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // ✅ CREATE PASTE
  createPaste(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}/api/pastes`,
      data
    );
  }

  // ✅ GET ALL PASTES (HOME)
  getPastes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL}/api/pastes`
    );
  }

  // ✅ GET SINGLE PASTE (VIEW)
  getPaste(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/api/pastes/${id}`
    );
  }
}
