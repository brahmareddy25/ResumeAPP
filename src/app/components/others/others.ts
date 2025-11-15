import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OthersService } from '../../services/others';
import { NavbarComponent } from "../navbar/navbar";

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './others.html',
  styleUrls: ['./others.css']
})
export class OthersComponent implements OnInit {

  newOther: any = {
    documentName: ''
  };

  othersList: any[] = [];
  selectedFile: File | null = null;

  isEditing = false;
  editId: number | null = null;

  constructor(
    private service: OthersService,
    private router: Router,
    private otherservice: OthersService
  ) {}

  ngOnInit(): void {
    this.getAllOthers();
  }

  getAllOthers() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.otherservice.getOthersByUser(Number(user.id)).subscribe({
        next: (data) => (this.othersList = data),
        error: (err) => console.error('Error fetching others documents', err),
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
  // ✅ Validation for Add/Edit
  validateFields(): string | null {
    const { documentName } = this.newOther;

    if (!documentName || documentName.trim() === '') {
      return '⚠️ Document name is required!';
    }

    if (!this.selectedFile && !this.isEditing) {
      return '⚠️ Please upload a document file (PDF or image)!';
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
    formData.append('documentName', this.newOther.documentName);

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      formData.append('user_id', user.id);
    } else {
      alert('⚠️ No user found. Please log in again.');
      return;
    }

    if (this.selectedFile) {
      formData.append('documentFile', this.selectedFile);
    }

    if (this.isEditing && this.editId) {
      this.service.updateOthers(this.editId, formData).subscribe({
        next: () => {
          alert('✅ Document updated successfully!');
          this.resetForm();
          this.getAllOthers();
        },
        error: (err) => {
          console.error('Error updating document', err);
          alert('❌ Failed to update document.');
        },
      });
    } else {
      this.service.addOthers(formData).subscribe({
        next: () => {
          alert('✅ Document added successfully!');
          this.resetForm();
          this.getAllOthers();
        },
        error: (err) => {
          console.error('Error adding document', err);
          alert('❌ Failed to add document.');
        },
      });
    }
  }

  onback() {
    this.router.navigate(['/dashboard']);
  }

  onEdit(other: any) {
    this.isEditing = true;
    this.editId = other.othersId;
    this.newOther = { ...other };
    alert('✏️ You are now editing this document. Make your changes and click "Update Document".');
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.service.deleteOthers(id).subscribe({
        next: () => {
          alert('🗑️ Document deleted successfully!');
          this.getAllOthers();
        },
        error: (err) => {
          console.error('Error deleting document', err);
          alert('❌ Failed to delete document.');
        },
      });
    }
  }

  getDocumentUrl(id: number) {
    return this.service.getDocumentUrl(id);
  }

  resetForm() {
    this.newOther = { documentName: '' };
    this.selectedFile = null;
    this.isEditing = false;
    this.editId = null;
  }
}
