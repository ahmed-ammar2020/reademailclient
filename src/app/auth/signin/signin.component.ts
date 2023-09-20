import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z0-9]*$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  submitForm() {
    this.authService.signin(this.signinForm.value).subscribe({
      next: () => {
        // sucessful signing in
        // navigating to the inbox
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        if (!err.status) {
          this.signinForm.setErrors({ noConnection: true });
        }
        if (err.error.username) {
          this.signinForm.setErrors({ usernameIsNotValid: true });
          return;
        }
        if (err.error.password) {
          this.signinForm.setErrors({ passwordIsNotTrue: true });
        }
      },
    });
  }
}
