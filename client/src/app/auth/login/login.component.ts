import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isEmailInvalid = false;
  isError = false;
  errorMessage = '';

  constructor(private authService: AuthService, private titleService: Title, private router: Router) {
    this.titleService.setTitle('Anstagram - Login');

    if (this.authService.checkToken()) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      this.authService.setToken(res.token);
      if (this.authService.checkToken()) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    }, err => {
      this.errorMessage = err.error.message;
      this.isError = true;
      console.log(err);
    });
  }

  onInputBlur() {
    this.isEmailInvalid = this.loginForm.controls.email.value && !this.loginForm.controls.email.valid;
  }

  removeErrorMessage() {
    if (document.readyState === 'complete') {
      const allNotifications = document.querySelectorAll('.notification');
      allNotifications.forEach((notificationToDelete: any) => {
        notificationToDelete.remove();
      });
    }
  }

}
