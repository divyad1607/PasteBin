import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  isLogin: boolean = false;

  username = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // Success message or redirect
        alert('User registered successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Error handling
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}