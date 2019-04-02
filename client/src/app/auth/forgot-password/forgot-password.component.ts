import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ia-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isEmailInvalid = false;
  isError = false;
  errorMessage = '';

  constructor(private authService: AuthService, private titleService: Title) {
    this.titleService.setTitle('Anstagram - Forgot Password');
  }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  forgotPassword() {
    this.authService.login(this.forgotPasswordForm.value).subscribe((res: any) => {
      console.log(res);
      this.authService.setToken(res.token);
    }, err => {
      this.errorMessage = err.error.message;
      this.isError = true;
      console.log(err);
    });
  }

  onInputBlur() {
    this.isEmailInvalid = this.forgotPasswordForm.controls.email.value && !this.forgotPasswordForm.controls.email.valid;
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
