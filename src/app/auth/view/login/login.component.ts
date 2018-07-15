import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.logIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  private createForm() {
    this.loginForm = this.fb.group(
      {
        email: ['', {validators: [Validators.required, Validators.email]}],
        password: ['', {validators: [Validators.required]}]
      }
    );
  }
}
