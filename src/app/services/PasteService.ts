import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasteService {
  // Removed duplicate createPaste method to resolve the error.

  private BASE_URL = 'http://localhost:8080/api/pastes';

  constructor(private http: HttpClient) {}

  // ✅ CREATE PASTE (FIXED)
  createPaste(data: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, data);
  }

  // ✅ GET SINGLE PASTE
  getPaste(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }
  // ✅ GET ALL PASTES (HOME PAGE)
getAllPastes() {
  return this.http.get<any[]>('http://localhost:8080/api/pastes');
}

}
