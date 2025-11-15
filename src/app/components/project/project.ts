import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar";
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-project',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
})
export class ProjectComponent implements OnInit {
  newProject: any = {
    projectTitle: '',
    softwareUsed: '',
    technologyUsed: '',
    description: ''
  };

  projectList: any[] = [];
  selectedFile: File | null = null;
  isEditing = false;
  editId: number | null = null;
  private apiUrl = 'http://localhost:8080/api/project';

  constructor(
    private http: HttpClient,
    private router: Router,
    private projectservice: ProjectService
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.projectservice.getProjectsByUser(Number(user.id)).subscribe({
        next: (data) => (this.projectList = data),
        error: (err) => console.error('Error fetching projects', err),
      });
    } else {
      this.router.navigate(["/"]);
      console.error('No user found in localStorage');
    }
  }
  viewCertificate(base64Data: string): void {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
}

  // ✅ Validation function used for both Add and Edit
  validateFields(): string | null {
    const { projectTitle, softwareUsed, technologyUsed, description } = this.newProject;
    const namePattern = /^[A-Za-z0-9\s]+$/;

    if (!projectTitle || !softwareUsed || !technologyUsed || !description) {
      return '⚠️ All fields are required!';
    }

    if (!namePattern.test(projectTitle)) {
      return '⚠️ Project title should not contain special characters!';
    }

    if (!namePattern.test(softwareUsed)) {
      return '⚠️ Software name should not contain special characters!';
    }

    if (!namePattern.test(technologyUsed)) {
      return '⚠️ Technology name should not contain special characters!';
    }

    if (description.trim().length < 10) {
      return '⚠️ Description must be at least 10 characters long!';
    }

    // ✅ Certificate (document) required validation
    if (!this.isEditing && !this.selectedFile) {
      return '⚠️ Please upload a certificate/document file!';
    }

    if (this.isEditing && !this.selectedFile && !this.newProject.document) {
      return '⚠️ Certificate/document cannot be empty while editing!';
    }

    return null;
  }

  onFileChange(event: any) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const maxSize = 1 * 1024 * 1024; // 1MB

  if (file.size > maxSize) {
    alert("File size must be less than 1MB!");
    this.selectedFile = null;
    event.target.value = ""; // clear input box
    return;
  }

  this.selectedFile = file;
}


  onSubmit() {
    const validationMessage = this.validateFields();
    if (validationMessage) {
      alert(validationMessage);
      return;
    }

    const formData = new FormData();
    formData.append('projectTitle', this.newProject.projectTitle);
    formData.append('softwareUsed', this.newProject.softwareUsed);
    formData.append('technologyUsed', this.newProject.technologyUsed);
    formData.append('description', this.newProject.description);

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      formData.append('user_id', user.id);
    } else {
      alert('⚠️ No user found. Please log in again.');
      return;
    }

    if (this.selectedFile) {
      formData.append('document', this.selectedFile);
    }

    if (this.isEditing && this.editId) {
      // ✅ EDIT PROJECT WITH ALERTS
      this.http.put(`${this.apiUrl}/update/${this.editId}`, formData).subscribe({
        next: () => {
          alert('✅ Project updated successfully!');
          this.resetForm();
          this.getAllProjects();
        },
        error: (err) => {
          console.error('Error updating project', err);
          alert('❌ Failed to update project.');
        },
      });
    } else {
      // ✅ ADD PROJECT WITH ALERTS
      this.http.post(`${this.apiUrl}/add`, formData).subscribe({
        next: () => {
          alert('✅ Project added successfully!');
          this.resetForm();
          this.getAllProjects();
        },
        error: (err) => {
          console.error('Error adding project', err);
          alert('❌ Failed to add project.');
        },
      });
    }
  }

  onEdit(project: any) {
    this.isEditing = true;
    this.editId = project.projectId;
    this.newProject = { ...project };
    this.selectedFile = null;
    alert('✏️ You are now editing this project. Make your changes and click "Update Project".');
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Project deleted successfully!');
          this.getAllProjects();
        },
        error: (err) => {
          console.error('Error deleting project', err);
          alert('❌ Failed to delete project.');
        },
      });
    }
  }

  resetForm() {
    this.newProject = {
      projectTitle: '',
      softwareUsed: '',
      technologyUsed: '',
      description: '',
    };
    this.selectedFile = null;
    this.isEditing = false;
    this.editId = null;
  }
}
