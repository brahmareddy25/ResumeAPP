import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="login-container">
    <div class="login-card">
      <h1>ResumeApp</h1>
      <form (ngSubmit)="onLogin()" #loginForm="ngForm">
        <input 
          [(ngModel)]="user.username" 
          name="username" 
          placeholder="Username" 
          required 
          pattern="^[a-zA-Z0-9_]+$"
          #username="ngModel">
        <div *ngIf="username.invalid && username.touched" class="error">
          Username can contain only letters, digits, and underscores (no spaces).
        </div>

        <input 
          type="password" 
          [(ngModel)]="user.password" 
          name="password" 
          placeholder="Password" 
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).{5,}$"
          #password="ngModel">
        <div *ngIf="password.invalid && password.touched" class="error">
          Password must be at least 5 characters, include uppercase, lowercase, number, and special character, and no spaces.
        </div>

        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>

      <p style="color: red;">{{ message }}</p>
      <p>New user? <a routerLink="/register">Register here</a></p>
    </div>
  </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg,#141E30,#243B55);
    }
    .login-card {
      background: #fff;
      padding: 3rem;
      border-radius: 15px;
      text-align: center;
      width: 350px;
    }
    input {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #E50914;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:disabled {
      background: #aaa;
      cursor: not-allowed;
    }
    h1 {
      color: #E50914;
      font-family: 'Helvetica';
      margin-bottom: 20px;
    }
    .error {
      color: red;
      font-size: 0.8rem;
      text-align: left;
    }
  `]
})
export class LoginComponent {
  user: any = {};
  message: string = "";

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.loginUser(this.user.username, this.user.password).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.message = "Invalid username or password";
      }
    });
  }
}
