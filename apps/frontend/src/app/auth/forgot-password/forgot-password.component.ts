import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private titleService: Title) {
    this.titleService.setTitle('Anstagram - Forgot Password');
  }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  forgotPassword() {
    console.log('forgot password');
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
