import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  selectedPhoto: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/']);
    }
  }

  backstep() {
    this.router.navigate(['/dashboard']);
  }

 onPhotoSelected(event: any): void {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const maxSize = 1 * 1024 * 1024; // 1MB

  if (file.size > maxSize) {
    alert("Photo size must be less than 1MB!");
    this.selectedPhoto = null;
    event.target.value = ""; // Clears the file input
    return;
  }

  this.selectedPhoto = file; 
}


  // ✅ Validation before saving
  isValidUserData(): boolean {
    const namePattern = /^[A-Za-z\s]{3,30}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;
    const addressPattern = /^[A-Za-z0-9\s,.-]{3,}$/;
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    const gitHubPattern = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/;

    if (!this.user.name || !namePattern.test(this.user.name)) {
      alert('Please enter a valid name (only letters and spaces, 3–30 chars).');
      return false;
    }

    if (!this.user.email || !emailPattern.test(this.user.email)) {
      alert('Please enter a valid email address (e.g., user@example.com).');
      return false;
    }

    if (!this.user.phoneNumber || !phonePattern.test(this.user.phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    if (!this.user.gender) {
      alert('Please select your gender.');
      return false;
    }

    if (!this.user.age || this.user.age <= 0) {
      alert('Please enter a valid age (greater than 0).');
      return false;
    }

    if (!this.user.address || !addressPattern.test(this.user.address)) {
      alert('Please enter a valid address.');
      return false;
    }

    if (this.user.linkedin && !linkedInPattern.test(this.user.linkedin)) {
      alert('Please enter a valid LinkedIn URL.');
      return false;
    }

    if (this.user.github && !gitHubPattern.test(this.user.github)) {
      alert('Please enter a valid GitHub URL.');
      return false;
    }

    return true;
  }

  saveChanges(): void {
    if (!this.isValidUserData()) return; // ✅ Stop if invalid

    const id = this.user.id;
    const formData = new FormData();

    formData.append('name', this.user.name || '');
    formData.append('email', this.user.email || '');
    formData.append('phoneNumber', this.user.phoneNumber || '');
    formData.append('gender', this.user.gender || '');
    formData.append('age', this.user.age ? this.user.age.toString() : '');
    formData.append('address', this.user.address || '');
    formData.append('linkedin', this.user.linkedin || '');
    formData.append('github', this.user.github || '');

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto, this.selectedPhoto.name);
    }

    this.userService.updateUser(id, formData).subscribe({
      next: (res: any) => {
        alert('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update profile.');
      }
    });
  }
}
