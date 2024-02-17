import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: spy}]
    })
    .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form', () => {
    const inputs = el.queryAll(By.css('input'));
    expect(inputs.length).toBe(2);
  });

  it('should update form values', () => {
    const inputs = el.queryAll(By.css('input'));
    const [ emailInput, passwordInput ] = inputs;

    const email = "user@email.com";
    const password = "password";

    emailInput.nativeElement.value = email;
    passwordInput.nativeElement.value = password;

    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.email?.value).toBe(email);
    expect(component.password?.value).toBe(password);
  });

  it('should call login method from service', () => {
    authServiceSpy.login.and.returnValue(of({ token: "sometoken"}));

    const inputs = el.queryAll(By.css('input'));
    const [ emailInput, passwordInput ] = inputs;

    const email = "user@email.com";
    const password = "password";

    emailInput.nativeElement.value = email;
    passwordInput.nativeElement.value = password;

    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    el.queryAll(By.css('button'))[0].nativeElement.click();
    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(authServiceSpy.login).toHaveBeenCalledWith(email, password);
  });

  it('should not call login method from service if form is invalid', () => {
    authServiceSpy.login.and.returnValue(of({ token: "sometoken"}));

    const inputs = el.queryAll(By.css('input'));
    const [ emailInput, passwordInput ] = inputs;

    const email = "incorrect email";
    const password = "";

    emailInput.nativeElement.value = email;
    passwordInput.nativeElement.value = password;

    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    el.queryAll(By.css('button'))[0].nativeElement.click();
    fixture.detectChanges();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
