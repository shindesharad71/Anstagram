import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isEmailInvalid = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  onInputBlur() {
    this.isEmailInvalid = this.loginForm.controls.email.value && !this.loginForm.controls.email.valid;
  }

}
