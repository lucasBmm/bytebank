import { Injectable } from '@angular/core';
import { Token } from '../model/Token.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  public removeToken(): void {
    localStorage.clear();
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(res: Token) {
    localStorage.setItem('token', res.token);
  }
}
