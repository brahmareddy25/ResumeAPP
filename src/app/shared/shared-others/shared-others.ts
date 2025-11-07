import { Component, OnInit } from '@angular/core';
import { OthersService } from '../../services/others';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedNavbar } from '../shared-navbar/shared-navbar';

@Component({
  selector: 'app-shared-others',
  imports: [CommonModule,FormsModule,SharedNavbar],
  templateUrl: './shared-others.html',
  styleUrl: './shared-others.css',
})
export class SharedOthers implements OnInit {

  newOther: any = {
    documentName: ''
  };
  othersList: any[] = [];
  selectedFile: File | null = null;

  isEditing = false;
  editId: number | null = null;

  constructor(private service: OthersService, private router: Router, private otherservice :OthersService) {}

  ngOnInit(): void {
    this.getAllOthers();
  }

 getAllOthers() {
  const userString = localStorage.getItem('sharedUserId');
  if (userString) {
    const user = JSON.parse(userString);
    this.otherservice.getOthersByUser(user).subscribe({
      next: (data) => this.othersList = data,
      error: (err) => console.error('Error fetching others documents', err)
    });
  } else {
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

}

