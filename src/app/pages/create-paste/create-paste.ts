import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasteService } from '../../services/PasteService';

@Component({
  selector: 'app-create-paste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-paste.html',
  styleUrls: ['./create-paste.css']
})
export class CreatePaste {

  content: string = '';
  expiryMinutes: number = 0; // 0 = Never
  loading = false;
  error = '';

  constructor(
    private pasteService: PasteService,
    private router: Router
  ) {}

  createPaste(): void {

    if (!this.content.trim()) {
      this.error = 'Content cannot be empty';
      return;
    }

    this.loading = true;

    const payload = {
      content: this.content,
      expiryMinutes: this.expiryMinutes
    };

    this.pasteService.createPaste(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/p', res.id]);
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to create paste';
      }
    });
  }
}
