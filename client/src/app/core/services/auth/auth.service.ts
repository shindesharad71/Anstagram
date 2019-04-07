import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSource = new Subject();
  isLoggedIn = this.isLoggedInSource.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(loginPayload) {
    return this.http.post(`${environment.BASE_URL}users/login`, loginPayload);
  }

  register(user) {
    return this.http.post(`${environment.BASE_URL}users/register`, user);
  }

  checkToken(): boolean {
    this.isLoggedInSource.next(this.cookieService.check('_auth'));
    return this.cookieService.check('_auth');
  }

  getToken() {
    return this.cookieService.get('_auth');
  }

  setToken(token: string) {
    this.cookieService.set('_auth', token);
    return true;
  }

  removeToken() {
    this.cookieService.deleteAll();
    if (!this.checkToken()) {
      return true;
    }
    return false;
  }

  verifyUser(query: any) {
    return this.http.post(`${environment.BASE_URL}users/verify`, query);
  }

  checkUsername(username: string) {
    return this.http.get(`${environment.BASE_URL}users/check/${username}`);
  }
}
