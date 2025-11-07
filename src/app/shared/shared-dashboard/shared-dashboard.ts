import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { SharedNavbar } from "../shared-navbar/shared-navbar";

@Component({
  selector: 'app-shared-dashboard',
  standalone: true,
  imports: [CommonModule, SharedNavbar],
  templateUrl: './shared-dashboard.html',
  styleUrls: ['./shared-dashboard.css']
})
export class SharedDashboardComponent implements OnInit {
  user: any;
  userPhotoUrl: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
       localStorage.setItem('sharedUserId',userId);
      this.userService.getUserById(+userId).subscribe({
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
