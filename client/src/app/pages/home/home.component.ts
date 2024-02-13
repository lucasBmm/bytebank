import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AccountComponent } from '../../ui/account/account.component';
import { LeftNavigationComponent } from '../../ui/left-navigation/left-navigation.component';
import { CardSessionComponent } from '../../ui/card-session/card-session.component';
import { BankStatementComponent } from '../../ui/bank-statement/bank-statement.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccountComponent, LeftNavigationComponent, CardSessionComponent, BankStatementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
      
  }
}
