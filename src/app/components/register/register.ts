import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="register-container">
    <div class="register-card">
      <h1>Register</h1>
      <form (ngSubmit)="onRegister()">
        <input type="text" [(ngModel)]="user.name" name="name" placeholder="Full Name" required>

        <input type="number" [(ngModel)]="user.age" name="age" placeholder="Age" required min="1">

        <!-- ✅ fixed gender dropdown -->
        <select [(ngModel)]="user.gender" name="gender" required>
          <option [ngValue]="null" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" [(ngModel)]="user.address" name="address" placeholder="Address" required>
        <input type="text" [(ngModel)]="user.phoneNumber" name="phoneNumber" placeholder="Phone Number" required>
        <input type="text" [(ngModel)]="user.username" name="username" placeholder="Username" required>
        <input type="password" [(ngModel)]="user.password" name="password" placeholder="Password" required>
        <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required>
        <input type="text" [(ngModel)]="user.linkedin" name="linkedin" placeholder="LinkedIn URL">
        <input type="text" [(ngModel)]="user.github" name="github" placeholder="GitHub URL">
        <input type="file" (change)="onFileSelected($event)">
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/">Login here</a></p>
    </div>
  </div>
  `,
  styleUrls: ['./register.css'] // 👈 restored your CSS file
})
export class RegisterComponent {
  user: any = { gender: null };
  selectedFile: any;

  constructor(private userService: UserService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onRegister() {
    if (!this.validateInputs()) return;

    const data = { ...this.user, photo: this.selectedFile };
    this.userService.registerUser(data).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Error while registering!')
    });
  }

  validateInputs(): boolean {
    if (!this.isValidName(this.user.name)) {
      alert('Name should contain only letters and spaces (3–50 characters).');
      return false;
    }

    if (this.user.age <= 0) {
      alert('Age must be greater than 0.');
      return false;
    }

    if (!this.isValidPhone(this.user.phoneNumber)) {
      alert('Phone number must be 10 digits.');
      return false;
    }

    if (!this.isValidUsername(this.user.username)) {
      alert('Username can only contain letters, numbers, and underscores (no spaces).');
      return false;
    }

    if (!this.isValidPassword(this.user.password)) {
      alert('Password must have ≥5 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char, and no spaces.');
      return false;
    }

    if (!this.isValidEmail(this.user.email)) {
      alert('Invalid email format.');
      return false;
    }

    return true;
  }

  isValidName(name: string): boolean {
    return /^[A-Za-z ]{3,50}$/.test(name.trim());
  }

  isValidPhone(phone: string): boolean {
    return /^[0-9]{10}$/.test(phone);
  }

  isValidUsername(username: string): boolean {
    return /^[A-Za-z0-9_]{3,15}$/.test(username);
  }

  isValidPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{5,}$/.test(password);
  }

  isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
