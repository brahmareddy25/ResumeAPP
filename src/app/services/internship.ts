import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private apiUrl = 'http://localhost:8080/api/internship'; // Backend URL

  constructor(private http: HttpClient) { }

  /** Get all internships */
  getAllInternships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  /** Get internships by user ID */
  getInternshipsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  /** Get single internship by ID */
  getInternshipById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Add new internship */
  addInternship(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  /** Update existing internship */
  updateInternship(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  /** Delete internship */
  deleteInternship(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

  /** Get certificate URL */
  getCertificateUrl(id: number): string {
    return `${this.apiUrl}/certificate/${id}`;
  }
}
