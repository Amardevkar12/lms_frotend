import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {

    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .pipe(take(1))
    .subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res?.success && res?.data) {

          const token = res.data.token;
          const role = (res.data.role || '').toUpperCase();

          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          const roleRoutes: any = {
            ADMIN: '/admin/dashboard',
            MANAGER: '/manager/dashboard',
            EMPLOYEE: '/employee/dashboard'
          };

          this.router.navigate([roleRoutes[role] || '/login']);
        }
      },

      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Invalid email or password';
      }
    });
  }
}