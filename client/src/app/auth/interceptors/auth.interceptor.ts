import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authenticated()) {
    const token = 'Bearer ' + authService.getToken();
    req = req.clone({ setHeaders: { Authorization: token } });
  }

  return next(req).pipe(tap(() => { },
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401 && err.status !== 403) {
          return;
        }
        
        authService.removeToken();
        router.navigate(['login']);
      }
  }));
};
