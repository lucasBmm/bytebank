import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BalanceComponent } from './balance/balance.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [BalanceComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  balance: number | null = null;
  username = "";
  hoje = new Date();

  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit(): void {
    if(this.authService.authenticated()) {
      this.authService.getUser().subscribe(user => {
        this.username = user.fullname;
      });

      this.accountService.getBalance().subscribe(res => this.balance = res.balance);
    }
  }
}
