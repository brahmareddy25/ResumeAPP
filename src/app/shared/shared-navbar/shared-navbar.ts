import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-navbar',
  imports: [CommonModule],
  templateUrl: './shared-navbar.html',
  styleUrls: ['./shared-navbar.css']
})
export class SharedNavbar {
  sharedUserId: string | null = null;

  constructor(private router: Router) {
    this.sharedUserId = localStorage.getItem('sharedUserId');
  }

  navigateTo(path: string) {
    if (this.sharedUserId) {
      // Replace :id placeholder with the actual userId
      path = path.replace(':id', this.sharedUserId);
    }
    this.router.navigate([path]);
  }
}
