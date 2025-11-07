import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) { }

  /** Get all projects */
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  /** Get project by ID */
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Get projects by user ID */
  getProjectsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  /** Add new project with file upload */
  addProject(projectData: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('softwareUsed', projectData.softwareUsed);
    formData.append('technologyUsed', projectData.technologyUsed);
    formData.append('description', projectData.description);
    formData.append('user_id', projectData.userId); // replace dynamically if needed

    if (file) {
      formData.append('document', file);
    }

    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  /** Update project */
  updateProject(id: number, projectData: any, file?: File): Observable<any> {
    const formData = new FormData();
    if (projectData.title) formData.append('title', projectData.title);
    if (projectData.softwareUsed) formData.append('softwareUsed', projectData.softwareUsed);
    if (projectData.technologyUsed) formData.append('technologyUsed', projectData.technologyUsed);
    if (projectData.description) formData.append('description', projectData.description);
    if (file) formData.append('document', file);

    return this.http.put(`${this.apiUrl}/update/${id}`, formData);
  }

  /** Delete project */
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  /** Get document URL for viewing/downloading */
  getDocumentUrl(id: number): string {
    return `${this.apiUrl}/document/${id}`;
  }
}
