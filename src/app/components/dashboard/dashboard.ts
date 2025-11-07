import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  userPhotoUrl: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);

      // Load photo if present
      if (this.user.photo) {
        this.userPhotoUrl = `data:image/jpeg;base64,${this.user.photo}`;
      }
    } else {
      this.router.navigate(['/']);
    }
    history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      history.go(1); // disables going back
    };
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  // Add inside DashboardComponent class
shareProfile() {
  
  const shareLink = `${window.location.origin}/profileview/${this.user.id}`;
  
  navigator.clipboard.writeText(shareLink).then(() => {
    alert(`Profile link copied! Share this link:\n${shareLink}`);
    window.open(shareLink, '_blank'); // opens the link directly
  });
}



  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  openLinkedIn() {
    if (this.user?.linkedin) window.open(this.user.linkedin, '_blank');
    else alert('LinkedIn link not available');
  }

  openGitHub() {
    if (this.user?.github) window.open(this.user.github, '_blank');
    else alert('GitHub link not available');
  }
}
