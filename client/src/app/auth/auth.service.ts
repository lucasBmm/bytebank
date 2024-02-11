import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

interface Token {
  token: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    return this.http.post<Token>('rest/auth/login', { email, password }).pipe(
      tap(res => this.setSession(res))
    );
  }

  public getUser() {
    return this.http.get('rest/auth/user');
  }

  public register(email: string, password: string) {
    return this.http.post<Token>('rest/auth/register', { email, password });
  }

  private setSession(res: Token) {
    localStorage.setItem('token', res.token);
  }

  public authenticated() {
    return !!localStorage.getItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
