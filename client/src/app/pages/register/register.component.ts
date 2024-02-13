import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      fullname: new FormControl("", [Validators.required, Validators.minLength(10)]),
      password: ["", [Validators.required, Validators.minLength(3)]],
      confirmPassword: ["", [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  register() {
    if (this.allFieldsValid()) {
      // @ts-ignore: Object is possibly 'null'.
      this.authService.register(this.email.value, this.password.value, this.fullname.value).subscribe(data => {
        this.router.navigate(['/login']);
      });
    } else {
      console.log("Invalid!");
    }
  }

  private allFieldsValid(): boolean | undefined {
    return this.email?.valid && this.password?.valid && this.confirmPassword?.valid && this.fullname?.valid;
  }

  get email() {
    return this.form.get('email');
  }

  get fullname() {
    return this.form.get('fullname');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  private matchPasswords(control: FormControl) {
    const password = this.form?.get('password')?.value;
    return password === control.value ? null : { mismatch: true };
  }
}
