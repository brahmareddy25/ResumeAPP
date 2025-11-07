import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar";
import { EducationService } from '../../services/education';

@Component({
  selector: 'app-education',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './education.html',
  styleUrls: ['./education.css'],
})
export class EducationComponent implements OnInit {

  newEducation: any = {
    qualification: '',
    schoolOrCollege: '',
    stream: '',
    yearOfPassed: '',
    typeOfMarks: '',
    marksObtained: ''
  };

  educationList: any[] = [];
  selectedFile: File | null = null;
  isEditing = false;
  editId: number | null = null;

  years: number[] = [];
  markTypes: string[] = ['Percentage', 'CGPA', 'Other'];

  private apiUrl = 'http://localhost:8080/api/education';

  constructor(
    private http: HttpClient,
    private router: Router,
    private educationservice: EducationService
  ) {}

  ngOnInit(): void {
    this.generateYears();
    this.getAllEducations();
  }

  /** ✅ Generate year options up to 5 years ahead */
  generateYears() {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 5;
    for (let year = 1990; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  /** ✅ Fetch all education records */
  getAllEducations() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.educationservice.getAllByUser(Number(user.id)).subscribe({
        next: (data) => (this.educationList = data),
        error: (err) => console.error('Error fetching educations', err),
      });
    } else {
      this.router.navigate(["/"]);
      console.error('No user found in localStorage');
    }
  }

  /** Handle file selection */
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /** ✅ Validation for all fields */
  validateForm(): boolean {
    if (
      !this.newEducation.qualification.trim() ||
      !this.newEducation.schoolOrCollege.trim() ||
      !this.newEducation.stream.trim() ||
      !this.newEducation.yearOfPassed ||
      !this.newEducation.typeOfMarks ||
      this.newEducation.marksObtained === '' ||
      this.newEducation.marksObtained === null
    ) {
      alert('⚠️ All fields are required.');
      return false;
    }

    if (this.newEducation.marksObtained <= 0) {
      alert('⚠️ Marks Obtained must be greater than 0.');
      return false;
    }

    if (!this.selectedFile && !this.isEditing) {
      alert('⚠️ Please upload a certificate file.');
      return false;
    }

    return true;
  }

  /** ✅ Add or update education record */
  onSubmit() {
    if (!this.validateForm()) return;

    const formData = new FormData();
    formData.append('qualification', this.newEducation.qualification);
    formData.append('schoolOrCollege', this.newEducation.schoolOrCollege);
    formData.append('stream', this.newEducation.stream);
    formData.append('yearOfPassed', this.newEducation.yearOfPassed);
    formData.append('typeOfMarks', this.newEducation.typeOfMarks);
    formData.append('marksObtained', this.newEducation.marksObtained.toString());

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
          alert('✅ Education updated successfully!');
          this.resetForm();
          this.getAllEducations();
        },
        error: (err) => console.error('Error updating education', err),
      });
    } else {
      this.http.post(`${this.apiUrl}/add`, formData).subscribe({
        next: () => {
          alert('✅ Education added successfully!');
          this.resetForm();
          this.getAllEducations();
        },
        error: (err) => console.error('Error adding education', err),
      });
    }
  }

  onback() {
    this.router.navigate(['/dashboard']);
  }

  onEdit(edu: any) {
    this.isEditing = true;
    this.editId = edu.educationId;
    this.newEducation = { ...edu };
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' }).subscribe({
        next: (res) => {
          alert(res);
          this.getAllEducations();
        },
        error: (err) => console.error('Error deleting education', err),
      });
    }
  }

  // getCertificateUrl(id: number) {
  //   return `${this.apiUrl}/certificate/${id}`;
  // }
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
    this.newEducation = {
      qualification: '',
      schoolOrCollege: '',
      stream: '',
      yearOfPassed: '',
      typeOfMarks: '',
      marksObtained: ''
    };
    this.selectedFile = null;
    this.isEditing = false;
    this.editId = null;
  }
}
