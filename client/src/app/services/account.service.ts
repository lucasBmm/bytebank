import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBalance } from '../model/IBalance.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  getBalance() {
    return this.http.get<IBalance>('rest/account/balance');
  }

  addBalance(depositValue: number) {
    return this.http.post<IBalance>('rest/account/deposit', { depositValue });
  }
}
