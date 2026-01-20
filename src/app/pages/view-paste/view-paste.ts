import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasteService } from '../../services/PasteService';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-view-paste',
  standalone: true,              
  imports: [CommonModule],   
  templateUrl: './view-paste.html',
  styleUrls: ['./view-paste.css']
})
export class ViewPaste implements OnInit {

  pasteData: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private pasteService: PasteService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('PASTE ID:', id);
  
      if (!id) {
        this.error = 'Invalid paste id';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }
  
      // reset state
      this.loading = true;
      this.pasteData = null;
      this.error = '';
  
      this.pasteService.getPaste(id).subscribe({
        next: (res: any) => {
          console.log('PASTE RESPONSE:', res);
          this.pasteData = res;
          this.loading = false;
  
          this.cdr.detectChanges();   // 🔥 THIS IS THE FIX
        },
        error: () => {
          this.error = 'Paste not found or expired';
          this.loading = false;
          this.cdr.detectChanges();   // 🔥 IMPORTANT
        }
      });
    });
  }
}  