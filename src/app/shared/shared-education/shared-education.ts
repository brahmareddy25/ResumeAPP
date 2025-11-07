import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedNavbar } from "../shared-navbar/shared-navbar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EducationService } from '../../services/education';

@Component({
  selector: 'app-shared-education',
  imports: [SharedNavbar,CommonModule,FormsModule],
  templateUrl: './shared-education.html',
  styleUrl: './shared-education.css',
})
export class SharedEducation implements OnInit{
  // Model for new/edit education
  newEducation: any = {
    qualification: '',
    schoolOrCollege: '',
    stream: '',
    yearOfPassed: '',
    typeOfMarks: '',
    marksObtained: ''
  };

  educationList: any[] = []; // all educations
  selectedFile: File | null = null;

  isEditing = false;
  editId: number | null = null;

  private apiUrl = 'http://localhost:8080/api/education'; // backend API

  constructor(private http: HttpClient, private router: Router,private educationservices: EducationService) {}

  ngOnInit(): void {
    this.getAllEducations();
  }

  /** Fetch all education records */
getAllEducations() {
  const userString = localStorage.getItem('sharedUserId'); // get the string
  if (userString) {
    const user = JSON.parse(userString); // convert string to object
    this.educationservices.getAllByUser(user).subscribe({
      next: (data) => this.educationList = data,
      error: (err) => console.error('Error fetching educations', err)
    });
  } else {
    console.error('No user found in localStorage');
  }
}

  /** Handle file input change */
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /** Add or update education */
  


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

  /** Reset form to default */
}
