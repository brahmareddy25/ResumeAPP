import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  user: any;
  errorMessage = ''; // holds validation message

  constructor(private userService: UserService, private router: Router) {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/login']);
    }
  }

  backstep() {
    this.router.navigate(['/dashboard']);
  }

  resetPassword() {
    this.errorMessage = ''; // clear old error

    // Password pattern check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (this.newPassword === this.oldPassword) {
      this.errorMessage = 'New password must be different from old password.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }

    if (!passwordRegex.test(this.newPassword)) {
      this.errorMessage =
        'Password must be ≥5 chars, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
      return;
    }

    // If valid
    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.userService.resetPassword(this.user.id, body).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) =>
        (this.errorMessage = err.error?.error || 'Failed to change password.')
    });
  }
}
