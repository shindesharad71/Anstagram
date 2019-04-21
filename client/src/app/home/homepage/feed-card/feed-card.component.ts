import { Component, OnInit, Input } from '@angular/core';
import { UserProfile, HeartIconStates, ImageProperties } from '../../../app.constants';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'ia-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
  @Input() feed;
  heartIcon = HeartIconStates.DEFAULT;
  defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;
  isThisFeedLiked = false;
  comment = '';
  isCommentBoxOpen = false;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  like(feedId?) {
    const feedIdToLike = feedId ? feedId : this.feed._id;
    console.log('feedIdToLike', feedIdToLike);
    this.heartIcon = this.heartIcon === HeartIconStates.DEFAULT ?
      HeartIconStates.LIKED : HeartIconStates.DEFAULT;
    if (this.heartIcon === HeartIconStates.LIKED) {
      this.isThisFeedLiked = true;
      window.navigator.vibrate(200);
    } else {
      this.isThisFeedLiked = false;
    }
  }

  // ! This is for double click like
  imageLiked(feedId) {
    this.like(feedId);
  }

  postComment() {
    const commentPayload = Object.assign({
      type: 'create',
      feedId: this.feed._id,
      comment: this.comment
    });
    this.httpService.post('comments', commentPayload).subscribe(res => {
      this.comment = '';
    }, err => {
      console.log(err);
    });
  }

  showCommentBox() {
    this.isCommentBoxOpen = !this.isCommentBoxOpen;
  }

}
