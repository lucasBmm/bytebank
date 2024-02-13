import { CommonModule } from '@angular/common';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  username: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.authenticated()) {
      this.authService.getUser().subscribe(user => {
        this.username = user.fullname;
      })
    }
  }
}
