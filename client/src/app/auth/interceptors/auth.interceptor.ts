import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log(authService.authenticated());
  if (authService.authenticated()) {
    const token = 'Bearer ' + authService.getToken();
    const authReq = req.clone({ setHeaders: { Authorization: token } });

    return next(authReq);
  } 

  return next(req);
};
