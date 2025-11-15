import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { InternshipService } from '../../services/internship';

@Component({
  selector: 'app-internship',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './internship.html',
  styleUrls: ['./internship.css'],
})
export class InternshipComponent implements OnInit {
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private internshipservice: InternshipService
  ) {}

  ngOnInit(): void {
    this.getAllInternships();
  }

  getAllInternships() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.internshipservice.getInternshipsByUser(Number(user.id)).subscribe({
        next: (data) => (this.internshipList = data),
        error: (err) => console.error('Error fetching internships', err),
      });
    } else {
      console.error('No user found in localStorage');
    }
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


  validateForm(): boolean {
    const i = this.newInternship;
    if (
      !i.companyName ||
      !i.role ||
      !i.startDate ||
      !i.endDate ||
      !i.description ||
      !this.selectedFile
    ) {
      alert('⚠️ Please fill in all required fields and upload a certificate!');
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.validateForm()) return;

    const formData = new FormData();
    formData.append('companyName', this.newInternship.companyName);
    formData.append('role', this.newInternship.role);
    formData.append('startDate', this.newInternship.startDate);
    formData.append('endDate', this.newInternship.endDate);
    formData.append('description', this.newInternship.description);

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      formData.append('user_id', user.id);
    }

    if (this.selectedFile) {
      formData.append('certificate', this.selectedFile);
    }

    if (this.isEditing && this.editId) {
      this.http.put(`${this.apiUrl}/update/${this.editId}`, formData).subscribe({
        next: () => {
          alert('✅ Internship updated successfully!');
          this.resetForm();
          this.getAllInternships();
        },
        error: (err) => console.error('Error updating internship', err),
      });
    } else {
      this.http.post(`${this.apiUrl}/add`, formData).subscribe({
        next: () => {
          alert('✅ Internship added successfully!');
          this.resetForm();
          this.getAllInternships();
        },
        error: (err) => console.error('Error adding internship', err),
      });
    }
  }

  onback() {
    this.router.navigate(['/dashboard']);
  }

  onEdit(intern: any) {
    this.isEditing = true;
    this.editId = intern.internshipId;
    this.newInternship = { ...intern };
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Internship deleted!');
          this.getAllInternships();
        },
        error: (err) => console.error('Error deleting internship', err),
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

  resetForm() {
    this.newInternship = {
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    this.selectedFile = null;
    this.isEditing = false;
    this.editId = null;
  }
}
