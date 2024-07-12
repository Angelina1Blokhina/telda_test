import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/dataStructure';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  resetForm() {
    this.registerForm.reset();
    Object.values(this.registerForm.controls).forEach((control) => {
      control.setErrors(null);
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        login: this.registerForm.value.login || '',
        password: this.registerForm.value.password || '',
        name: this.registerForm.value.name || '',
        registerDate: new Date(),
      };

      const isRegistration = this.authService.registration(user);
      if (isRegistration) {
        this.resetForm();
      }

      console.log(isRegistration);
    }
  }
}
