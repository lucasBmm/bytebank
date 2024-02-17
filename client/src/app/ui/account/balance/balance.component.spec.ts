import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceComponent, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display user balance if show is not set', () => {
    component.balance = 0;
    fixture.detectChanges();
    
    const balance = fixture.nativeElement.querySelector('.balance_value');
    expect(balance).toBeFalsy();
  });

  it('should display user balance when show variabel is set', () => {
    component.balance = 0;
    component.show = true;

    fixture.detectChanges();
    
    const balance = fixture.nativeElement.querySelector('.balance_value');
    expect(balance.textContent).toEqual('0');
  });
});
