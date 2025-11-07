import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificationService } from '../../services/certification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedNavbar } from '../shared-navbar/shared-navbar';

@Component({
  selector: 'app-shared-certification',
  imports: [CommonModule,FormsModule,SharedNavbar],
  templateUrl: './shared-certification.html',
  styleUrl: './shared-certification.css',
})
export class SharedCertification implements OnInit {
  newCertification: any = {
    certificateName: '',
    dateOfGot: ''
  };

  certificationList: any[] = [];
  selectedFile: File | null = null;

  isEditing = false;
  editId: number | null = null;

  private apiUrl = 'http://localhost:8080/api/certification';

  constructor(private http: HttpClient, private router: Router ,private certificationservice:CertificationService) {}

  ngOnInit(): void {
    this.getAllCertifications();
  }

 getAllCertifications() {
  const userString = localStorage.getItem('sharedUserId');
  if (userString) {
    const user = JSON.parse(userString);
    this.certificationservice.getCertificationsByUser(user).subscribe({
      next: (data) => this.certificationList = data,
      error: (err) => console.error('Error fetching certifications', err)
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
