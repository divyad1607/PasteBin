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

  title: string = '';
  content: string = '';

  expireOption: string = 'never';
  expiresAt: Date | null = null;
  expiresAtIso: string | null = null;

  constructor(
    private pasteService: PasteService,
    private router: Router
  ) {}

  // 🔹 Expire select handler
  onExpireChange(value: string) {
    const date = this.calculateExpiry(value);
    this.expiresAt = date;
    this.expiresAtIso = date ? date.toISOString() : null;

    console.log('ExpiresAt(local):', this.expiresAt);
    console.log('ExpiresAt(ISO):', this.expiresAtIso);
  }

  // 🔹 Time calculation (LOCAL)
  calculateExpiry(type: string): Date | null {
    if (type === 'never') return null;

    const now = new Date();

    switch (type) {
      case '10m':
        now.setMinutes(now.getMinutes() + 10);
        break;
      case '1h':
        now.setHours(now.getHours() + 1);
        break;
      case '1d':
        now.setDate(now.getDate() + 1);
        break;
    }

    return now;
  }

  // 🔹 Save paste (SEPARATE METHOD)
  savePaste() {
    if (!this.content) return;

    const payload = {
      title: this.title,
      content: this.content,
      expiresAt: this.expiresAtIso
    };

    console.log('FINAL PAYLOAD:', payload);

    this.pasteService.createPaste(payload).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error(err)
    });
  }
}
