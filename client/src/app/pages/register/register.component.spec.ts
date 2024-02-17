import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { DebugElement } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<AuthService>('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.register.and.returnValue(of());

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all inputs', () => {
    const inputs = el.queryAll(By.css('input'));
    expect(inputs.length).withContext("Email, fullname, password, confirm password").toBe(4);
  });

  it('should update form value', () => {
    const inputs = el.queryAll(By.css('input'));
    const [email, fullname, password, confirmPassword] = inputs;

    email.nativeElement.value = "user@email.com";
    fullname.nativeElement.value = "user fullname";
    password.nativeElement.value = confirmPassword.nativeElement.value = "password";

    inputs.forEach(input => input.nativeElement.dispatchEvent(new Event('input')));

    expect(component.email?.value).toBe("user@email.com");
    expect(component.fullname?.value).toBe("user fullname");
    expect(component.password?.value).toBe("password");
    expect(component.confirmPassword?.value).toBe("password");
    expect(component.form.valid).toBeTrue();
  });

  it('#matchPasswords should return null if passwords match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('password123'),
      confirmPassword: new FormControl('password123')
    });

    component.form = formGroup;
    expect(component.matchPasswords(formGroup.controls.confirmPassword)).toBeNull();
  });

  it('#matchPassword should return mismatch if password are different', () => {
    const formGroup = new FormGroup({
      password: new FormControl('password123'),
      confirmPassword: new FormControl('password1234')
    });

    component.form = formGroup;
    expect(component.matchPasswords(formGroup.controls.confirmPassword)).toEqual({ mismatch: true});
  });

  it('should call #register when button clicked', fakeAsync(() => {
    spyOn(component, 'register');
    const button = el.queryAll(By.css('button'))[0];

    button.nativeElement.click();
    tick();

    expect(component.register).toHaveBeenCalled();
  }));

  it('should call service register when button clicked with correct parameters', fakeAsync(() => {
    const inputs = el.queryAll(By.css('input'));
    const [email, fullname, password, confirmPassword] = inputs;

    email.nativeElement.value = "user@email.com";
    fullname.nativeElement.value = "user fullname";
    password.nativeElement.value = confirmPassword.nativeElement.value = "password";

    inputs.forEach(input => input.nativeElement.dispatchEvent(new Event('input')));

    const button = el.queryAll(By.css('button'))[0];

    button.nativeElement.click();
    tick();

    expect(authServiceSpy.register).toHaveBeenCalled();
    expect(authServiceSpy.register).toHaveBeenCalledWith("user@email.com", "password", "user fullname");
  }));
});
