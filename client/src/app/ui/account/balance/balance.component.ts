import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent {

  @Input()
  balance: number | null = null;
  show: boolean = false;
  
  changeBalanceView() {
    this.show = !this.show;
  }
}
