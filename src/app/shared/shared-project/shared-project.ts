import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedNavbar } from '../shared-navbar/shared-navbar';


@Component({
  selector: 'app-shared-project',
  imports: [FormsModule, CommonModule,SharedNavbar],
  templateUrl: './shared-project.html',
  styleUrl: './shared-project.css',
})
export class SharedProject  implements OnInit {
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

  constructor(private http: HttpClient, private router: Router,private projectservice:ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

getAllProjects() {
  const userString = localStorage.getItem('sharedUserId'); // get the string from localStorage
  if (userString) {
    const user = JSON.parse(userString); // convert string to object
    this.projectservice.getProjectsByUser(user).subscribe({
      next: (data) => this.projectList = data,
      error: (err) => console.error('Error fetching projects', err)
    });
  } else {
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

}
