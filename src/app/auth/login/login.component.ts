import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submitting... %O', this.loginForm.value);
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
