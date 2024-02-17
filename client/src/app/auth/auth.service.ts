import { TokenService } from './../services/token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { UserDetails } from '../model/UserDetails.model';
import { Token } from '../model/Token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public login(email: string, password: string) {
    return this.http.post<Token>('rest/auth/login', { email, password }).pipe(
      tap(res => this.tokenService.setToken(res))
    );
  }

  public register(email: string, password: string, fullname: string) {
    return this.http.post<void>('rest/auth/register', { email, password, fullname });
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

  public setUserLocal(user: UserDetails) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public authenticated() {
    return !!this.tokenService.getToken();
  }
}
