import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  name = '';
  password = '';
  error = '';
  username: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  login() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // 1️⃣ token save
        localStorage.setItem('token', res.token);
  
        // 2️⃣ PAGE CHANGE (THIS WAS MISSING)
        this.router.navigate(['/']);
        // OR
        // this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
  
  
}