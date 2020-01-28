import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(`${environment.BASE_URL}${url}`);
  }

  post(url: string, payload: any) {
    return this.http.post(`${environment.BASE_URL}${url}`, payload);
  }
}
