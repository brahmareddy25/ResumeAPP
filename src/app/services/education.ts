import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Education {
  educationId?: number;
  userId?: number;
  qualification: string;
  schoolOrCollege: string;
  stream?: string;
  yearOfPassed?: string;
  typeOfMarks?: string;
  marksObtained?: number;
  certificate?: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = 'http://localhost:8080/api/education';

  constructor(private http: HttpClient) {}

  getAllByUser(userId: number): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}/user/${userId}`);
  }

  addEducation(data: FormData): Observable<Education> {
    return this.http.post<Education>(`${this.baseUrl}/add`, data);
  }

  updateEducation(educationId: number, data: FormData): Observable<Education> {
    return this.http.put<Education>(`${this.baseUrl}/update/${educationId}`, data);
  }

  deleteEducation(educationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${educationId}`);
  }
}
