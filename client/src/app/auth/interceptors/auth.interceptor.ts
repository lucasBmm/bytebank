import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();

  if (token) {
    const authHeader = 'Bearer ' + token;
    req = req.clone({ setHeaders: { Authorization: authHeader } });
  }

  return next(req).pipe(tap(() => { },
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401 && err.status !== 403) {
          return;
        }
        
        tokenService.removeToken();
        router.navigate(['login']);
      }
  }));
};
