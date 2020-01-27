import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSource = new Subject();
  isLoggedIn = this.isLoggedInSource.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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

  setUsername(username) {
    this.cookieService.set('username', username);
    return true;
  }

  getUsername() {
    return this.cookieService.get('username');
  }
}
