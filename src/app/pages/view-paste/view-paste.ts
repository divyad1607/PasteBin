import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // 1. Import this

@Component({
  selector: 'app-view-paste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-paste.html',
})
export class ViewPaste implements OnInit {
  pasteData: any = null; // Initial value null rakhein

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Constructor mein inject karein
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPaste(id);
    }
  }
  fetchPaste(id: string): void {
    this.http.get(`http://localhost:8080/api/pastes/${id}`)
      .subscribe({
        next: (data: any) => {
          this.pasteData = data;
          console.log('Data assigned:', this.pasteData);
        },
        error: (err) => {
          console.error('Fetch error:', err);
          // Error aane par loading screen hatane ke liye
          this.pasteData = { content: "Error: Could not load paste." }; 
        }
      });
  }
}