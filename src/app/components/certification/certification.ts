import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar";
import { CertificationService } from '../../services/certification';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './certification.html',
  styleUrls: ['./certification.css'],
})
export class CertificationComponent implements OnInit {
  newCertification: any = {
    certificateName: '',
    dateOfGot: ''
  };

  certificationList: any[] = [];
  selectedFile: File | null = null;
  isEditing = false;
  editId: number | null = null;

  private apiUrl = 'http://localhost:8080/api/certification';

  constructor(
    private http: HttpClient,
    private router: Router,
    private certificationservice: CertificationService
  ) {}

  ngOnInit(): void {
    this.getAllCertifications();
  }

  // ✅ Fetch all certifications
  getAllCertifications() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.certificationservice.getCertificationsByUser(Number(user.id)).subscribe({
        next: (data) => this.certificationList = data,
        error: (err) => console.error('Error fetching certifications', err)
      });
    } else {
      this.router.navigate(["/"]);
      console.error('No user found in localStorage');
    }
  }

  // ✅ File input change handler
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


  // ✅ Submit handler for Add/Edit
  onSubmit() {
    // Check required fields
    if (!this.newCertification.certificateName.trim()) {
      alert('⚠️ Certificate Name is required!');
      return;
    }
    if (!this.newCertification.dateOfGot) {
      alert('⚠️ Please select the Date of Got!');
      return;
    }
    if (!this.isEditing && !this.selectedFile) {
      alert('⚠️ Please upload a certificate file!');
      return;
    }

    const formData = new FormData();
    formData.append('certificateName', this.newCertification.certificateName);
    formData.append('dateOfGot', this.newCertification.dateOfGot);

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      formData.append('user_id', user.id);
    } else {
      this.router.navigate(["/"]);
      console.error('No user found in localStorage');
    }

    if (this.selectedFile) {
      formData.append('certificateFile', this.selectedFile);
    }

    // ✅ Edit existing certification
    if (this.isEditing && this.editId) {
      this.http.put(`${this.apiUrl}/update/${this.editId}`, formData).subscribe({
        next: () => {
          alert('✅ Certification updated successfully!');
          this.resetForm();
          this.getAllCertifications();
        },
        error: (err) => console.error('Error updating certification', err)
      });

    // ✅ Add new certification
    } else {
      this.http.post(`${this.apiUrl}/add`, formData).subscribe({
        next: () => {
          alert('✅ Certification added successfully!');
          this.resetForm();
          this.getAllCertifications();
        },
        error: (err) => console.error('Error adding certification', err)
      });
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

  // ✅ Edit record
  onEdit(cert: any) {
    this.isEditing = true;
    this.editId = cert.certificationId;
    this.newCertification = {
      certificateName: cert.certificateName,
      dateOfGot: cert.dateOfGot
    };
    alert('📝 You can now edit this certification.');
  }

  // ✅ Delete record
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert("🗑️ Deleted successfully!");
          this.getAllCertifications();
        },
        error: (err) => console.error('Error deleting certification', err)
      });
    }
  }

  // ✅ Navigate back
  onback() {
    this.router.navigate(['/dashboard']);
  }

  // ✅ Reset form
  resetForm() {
    this.newCertification = {
      certificateName: '',
      dateOfGot: ''
    };
    this.selectedFile = null;
    this.isEditing = false;
    this.editId = null;
  }
}
