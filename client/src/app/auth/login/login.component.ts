import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isEmailInvalid = false;
  errorMessage: string;
  notificationType = 'is-danger';

  constructor(private authService: AuthService, private titleService: Title, private router: Router, private route: ActivatedRoute) {
    this.checkForEmailVerification();
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
    this.errorMessage = null;
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
      console.log(err);
    });
  }

  onInputBlur() {
    this.isEmailInvalid = this.loginForm.controls.email.value && !this.loginForm.controls.email.valid;
  }

  checkForEmailVerification() {
    this.errorMessage = null;
    let urlParams = null;
    this.route.queryParams.subscribe(params => {
      urlParams = params;
    });

    if (urlParams) {
      const query = { query:  urlParams['query']};
      this.authService.verifyUser(query).subscribe((res: any) => {
        this.notificationType = 'is-success';
        this.errorMessage = res.message;
        console.log(res);
      }, err => {
        this.errorMessage = err.error.message;
        console.log(err);
      });
    }
  }

}
