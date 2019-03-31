import { Component, OnInit, Input } from '@angular/core';
import { UserProfile, HeartIconStates } from '../../../app.constants';

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

  constructor() { }

  ngOnInit() {
  }

  like() {
    this.heartIcon = this.heartIcon === HeartIconStates.DEFAULT ?
      HeartIconStates.LIKED : HeartIconStates.DEFAULT;
    if (this.heartIcon === HeartIconStates.LIKED) {
      this.isThisFeedLiked = true;
    } else {
      this.isThisFeedLiked = false;
    }
  }

}
