import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../../services/internship';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedNavbar } from '../shared-navbar/shared-navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-internship',
  imports: [SharedNavbar,CommonModule,FormsModule],
  templateUrl: './shared-internship.html',
  styleUrl: './shared-internship.css',
})
export class SharedInternship implements OnInit {
  newInternship: any = {
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  };

  internshipList: any[] = [];
  selectedFile: File | null = null;

  isEditing = false;
  editId: number | null = null;

  private apiUrl = 'http://localhost:8080/api/internship';

  constructor(private http: HttpClient, private router: Router, private internshipservice: InternshipService) {}

  ngOnInit(): void {
    this.getAllInternships();
  }

getAllInternships() {
  const userString = localStorage.getItem('sharedUserId');// get the string from localStorage
  if (userString) {
    const user = JSON.parse(userString); // convert string to object
    this.internshipservice.getInternshipsByUser(user).subscribe({
      next: (data) => this.internshipList = data,
      error: (err) => console.error('Error fetching internships', err)
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



