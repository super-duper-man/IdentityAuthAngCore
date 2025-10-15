import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (authService.isLoggedIn()) {
    const cloneReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${authService.getToken()}`
      ),
    });

    return next(cloneReq).pipe(
      tap({
        error: (err: any) => {
          console.log(err);
          if (err.status === 401) {
            authService.deleteToken();
            setTimeout(() => {
              toast.info(
                'لطفا دوباره وارد شوید، زمان مجوز شما به پایان رسیده است.'
              );
            }, 1500);
            router.navigateByUrl('/signin');
          } else if (err.status === 403) {
            toast.error('کاربر شما مجوز لازم را ندارد.');
          }
        },
      })
    );
  }
  return next(req);
};
