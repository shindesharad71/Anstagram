import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  notificationType = 'is-danger';

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private titleService: Title, private router: Router, private route: ActivatedRoute, private httpService: HttpService) {
    this.checkForEmailVerification();
    this.titleService.setTitle('Anstagram - Login');
    if (this.authService.checkToken()) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginInput: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.httpService.post('users/login', this.loginForm.value).subscribe((res: any) => {
        this.authService.setToken(res.token);
        if (this.authService.checkToken()) {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/login');
        }
      }, err => {
        this.errorMessage = err.error.message;
        console.log(err);
      });
    }
  }

  checkForEmailVerification() {
    this.errorMessage = null;
    let urlParams = null;
    this.route.queryParams.subscribe(params => {
      urlParams = params;
    });

    if (urlParams && urlParams['query']) {
      const query = { query: urlParams['query'] };
      this.httpService.post('users/verify', query).subscribe((res: any) => {
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
