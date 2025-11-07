import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedNavbar } from '../shared-navbar/shared-navbar';

@Component({
  selector: 'app-shared-profile',
  standalone: true,
  imports: [CommonModule, SharedNavbar],
  templateUrl: './shared-profile.html',
  styleUrl: './shared-profile.css',
})
export class SharedProfile implements OnInit {
  user: any;
  userPhotoUrl: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const userString = localStorage.getItem('sharedUserId');
    if (userString) {
      const user = JSON.parse(userString);
      this.userService.getUserById(user).subscribe({
        next: (data) => {
          this.user = data;
          if (this.user.photo) {
            this.userPhotoUrl = `data:image/jpeg;base64,${this.user.photo}`;
          }
        },
        error: () => alert('User not found')
      });
    }
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



