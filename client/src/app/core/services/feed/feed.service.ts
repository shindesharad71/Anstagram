import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {}

  getUserFeed() {
    return this.http.get(`${environment.BASE_URL}feed`);
  }
}
