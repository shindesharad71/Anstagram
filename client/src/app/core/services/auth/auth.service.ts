import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    return this.http.post(`${environment.BASE_URL}users/login`, loginPayload);
  }

  register(user) {
    return this.http.post(`${environment.BASE_URL}users/login`, user);
  }

  getToken() {
    const token = 'ABCD';
    return token;
  }
}
