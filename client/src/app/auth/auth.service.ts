import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { UserDetails } from '../model/UserDetails.model';

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

  public register(email: string, password: string, fullname: string) {
    return this.http.post<null>('rest/auth/register', { email, password, fullname });
  }

  public setSession(res: Token) {
    localStorage.setItem('token', res.token);
  }

  public removeToken(): void {
    localStorage.clear();
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUser(): Observable<UserDetails> {
    if (this.getUserLocal()) {
      return of(this.getUserLocal());
    }

    return this.http.get<UserDetails>('rest/auth/user').pipe(
      tap(res => this.setUserLocal(res))
    );
  }

  private getUserLocal(): UserDetails {
    return JSON.parse(localStorage.getItem('user')!);
  }

  private setUserLocal(user: UserDetails) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public authenticated() {
    return !!localStorage.getItem('token');
  }
}
