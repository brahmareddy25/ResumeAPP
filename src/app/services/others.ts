import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  private apiUrl = 'http://localhost:8080/api/others';

  constructor(private http: HttpClient) { }

  getAllOthers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getOthersByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  addOthers(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  updateOthers(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteOthers(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  getDocumentUrl(id: number): string {
    return `${this.apiUrl}/document/${id}`;
  }
}
