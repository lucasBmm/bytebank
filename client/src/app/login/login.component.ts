import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  login() {
    if (this.email?.valid && this.password?.valid) {
      console.log("Valid!")
    } else {
      console.log("Invalid!")
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
 