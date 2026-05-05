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

    // Validation
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
          const route = this.authService.getDefaultRoute();

          if (route !== '/login') {
            this.router.navigateByUrl(route);
          } else {
            this.error = 'Login successful, but user role is not recognized';
          }

        } else {
          this.error = res?.message || 'Login failed';
        }
      },

      error: (err) => {
        this.loading = false;
        console.error('Login Error:', err);

        this.error =
          err?.error?.message ||
          'Invalid email or password';
      }
    });
  }
}
