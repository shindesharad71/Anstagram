import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComment(feedItemsToSkip: number) {
    return this.http.get(`${environment.BASE_URL}comments`);
  }

  postComment(commentPayload) {
    return this.http.post(`${environment.BASE_URL}comments`, commentPayload);
  }
}
