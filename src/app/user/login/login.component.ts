import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TOKEN_KEY } from '../../shared/constants';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private isSubmitted: boolean = false;
  form = inject(FormBuilder).group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
  }

  hasDisplayError(controlName: string): Boolean {
    const control = this.form.get(controlName);

    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.isSubmitted = false;
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if (err.status === 400) {
            this.toast.error(err.error.message, 'خطا در ورود');
          } else {
            console.error(err);
          }
        },
      });
    }
  }
}
