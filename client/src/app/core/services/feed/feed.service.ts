import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getUserFeed() {
    return this.http.get(`${environment.BASE_URL}feed`);
  }

  createUserFeed(feedPayload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'multipart/form-data'
      })
    };
    return this.http.post(`${environment.BASE_URL}feed`, feedPayload);
  }
}
