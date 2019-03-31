import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getUserFeed(feedItemsToSkip: number) {
    return this.http.get(`${environment.BASE_URL}feed/${feedItemsToSkip}`);
  }

  createUserFeed(feedPayload) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.post(`${environment.BASE_URL}feed`, feedPayload, headers);
  }
}
