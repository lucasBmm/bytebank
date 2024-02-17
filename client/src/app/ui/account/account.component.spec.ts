import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AuthService } from '../../auth/auth.service';
import { AccountService } from '../../services/account.service';
import { MockComponent } from 'ng-mocks';
import { BalanceComponent } from './balance/balance.component';
import { DebugElement } from '@angular/core';
import { UserDetails } from '../../model/UserDetails.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let accountService: jasmine.SpyObj<AccountService>;
  let el: DebugElement;
  const user: UserDetails = {
    email: "user@email.com",
    fullname: "user fullname"
  };

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj<AuthService>("AuthService", ["authenticated", "getUser"]);
    const accountSpy = jasmine.createSpyObj<AccountService>("AccountService", ["getBalance"]);

    await TestBed.configureTestingModule({
      imports: [AccountComponent, MockComponent(BalanceComponent) ],
      providers: [ 
        { provide: AuthService, useValue: authSpy },
        { provide: AccountService, useValue: accountSpy } 
      ]
    })
    .compileComponents();
    
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    fixture = TestBed.createComponent(AccountComponent);
    accountService.getBalance.and.returnValue(of({ balance: 0 }));
    authService.getUser.and.returnValue(of(user));
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    authService.authenticated.and.returnValue(false);

    expect(component).toBeTruthy();
  });

  it('should render username ', () => {
    authService.authenticated.and.returnValue(true);

    component.ngOnInit();
    fixture.detectChanges();

    const helloMessage = el.query(By.css('h1'));

    expect(component.username).toBe(user.fullname);
    expect(helloMessage.nativeElement.textContent.includes(user.fullname)).toBeTrue();
  });

  it('should call #getbalance', () => {
    authService.authenticated.and.returnValue(true);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.balance).toBe(0);
    expect(accountService.getBalance).toHaveBeenCalledTimes(1);
  });
});
