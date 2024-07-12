import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { login, password } = {
        login: this.loginForm.value.login || '',
        password: this.loginForm.value.password || '',
      };

      this.authService.logIn(login, password);
    }
  }
}
