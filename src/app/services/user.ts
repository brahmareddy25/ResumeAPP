import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    return this.http.post(`${this.baseUrl}/api/users/register`, formData);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/login`, { username, password });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/${id}`);
  }

//   updateUser(id: number, formData: FormData): Observable<any> {
//   return this.http.put(`http://localhost:8080/api/users/${id}`, formData);
// }
// updateUser(id: number, user: any): Observable<any> {
//     const formData = new FormData();
//     Object.keys(user).forEach(key => formData.append(key, user[key]));
//     return this.http.put(`${this.baseUrl}/{id}`, formData);
//   }
updateUser(id: number, formData: FormData): Observable<any> {
    // Let HttpClient handle multipart automatically
    return this.http.put(`${this.baseUrl}/api/users/${id}`, formData);
  }

  resetPassword(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/users/${id}/reset-password`, data);
  }
}
