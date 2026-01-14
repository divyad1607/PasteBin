import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PasteService } from '../../services/PasteService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  // HTML 'snippets' dhoond raha hai, isliye yahi naam use karein
  snippets: any[] = []; 

  constructor(
    private pasteService: PasteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPastes();
  }
  
  loadPastes(): void {
    this.pasteService.getPastes().subscribe({
      next: (data: any[]) => {
        this.snippets = data; // Data ko snippets mein daalein
      },
      error: err => console.error(err)
    });
  }
  
  openPaste(id: string): void {
    this.router.navigate(['/paste', id]);
  }
}