import { Component, OnInit, Input } from '@angular/core';
import { UserProfile, HeartIconStates } from '../../../app.constants';
import { CommentService } from 'src/app/core/services/comment/comment.service';

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

  constructor(private commentService: CommentService) { }

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

  postComment() {
    console.log(this.comment);
    console.log(this.feed._id);
    const commentPayload = Object.assign({
      type: 'create',
      feedId: this.feed._id,
      comment: this.comment
    });
    this.commentService.postComment(commentPayload).subscribe(res => {
      this.comment = '';
    }, err => {
      console.log(err);
    });
  }

  showCommentBox() {
    this.isCommentBoxOpen = !this.isCommentBoxOpen;
  }

}
