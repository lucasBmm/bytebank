import { AuthService } from './../../auth/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserDetails } from '../../model/UserDetails.model';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let el: DebugElement;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<AuthService>("AuthService", ["authenticated", "getUser"]);
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [ { provide: AuthService, useValue: spy } ]
    })
    .compileComponents();
    
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo image when component is created', () => {
    const logo = el.queryAll(By.css('img'))[0];

    expect(logo).toBeTruthy();
  });

  it('should not show username if user not authenticated', () => {
    authService.authenticated.and.returnValue(false);

    const username = el.queryAll(By.css('.text-success'))[0];
    expect(username).toBeFalsy();
    expect(authService.authenticated).toHaveBeenCalledTimes(1);
  });

  it('should render username when user is authenticated', () => {
    authService.authenticated.and.returnValue(true);
    const user: UserDetails = {
      email: "user@email.com",
      fullname: "full username"
    };

    authService.getUser.and.returnValue(of(user));

    component.ngOnInit();
    fixture.detectChanges();

    const username = el.queryAll(By.css('.text-success'))[0];

    expect(component.username).toEqual(user.fullname);
    expect(username).toBeTruthy();
    expect(username.nativeElement.textContent).toEqual(user.fullname);
  });
});
