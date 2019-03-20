import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'ia-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isEmailInvalid = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl('', [Validators.required])
    });
  }

  register() {
    this.authService.login(this.registerForm.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  onInputBlur() {
    this.isEmailInvalid = this.registerForm.controls.email.value && !this.registerForm.controls.email.valid;
  }

}
