import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  };

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.authService.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('حساب کاربری ایجاد گردید.', 'ثبت نام');
          }
        },
        error: (errorResponse: any) => {
          errorResponse.error.errors.forEach((item: any) => {
            switch (item.code) {
              case 'DuplicateEmail':
                this.toastr.error('ایمیل وارد شده تکراری است');
                break;
              default:
                this.toastr.error('در ارتباط با سرور مشکلی پیش آمده است');
                break;
            }
          });
        },
      });
    }
  }

  hasDisplayError(controlName: string): Boolean {
    const control = this.form.get(controlName);

    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}
