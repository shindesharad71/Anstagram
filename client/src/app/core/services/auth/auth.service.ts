import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(loginPayload) {
    return this.http.post(`${environment.BASE_URL}users/login`, loginPayload);
  }

  register(user) {
    return this.http.post(`${environment.BASE_URL}users/register`, user);
  }

  checkToken(): boolean {
    return this.cookieService.check('_auth');
  }

  getToken() {
    return this.cookieService.get('_auth');
  }

  setToken(token: string) {
    this.cookieService.set('_auth', token);
    return true;
  }
}
