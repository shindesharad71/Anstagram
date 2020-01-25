import { Component, OnInit, Input } from '@angular/core';
import { UserProfile, HeartIconStates, ImageProperties } from '../../../../app.constants';

@Component({
  selector: 'ia-feed-comments',
  templateUrl: './feed-comments.component.html',
  styleUrls: ['./feed-comments.component.scss']
})
export class FeedCommentsComponent implements OnInit {
  @Input() comment: any;
  isThisCommentLiked = false;
  heartIcon = HeartIconStates.DEFAULT;
  constructor() { }

  ngOnInit() {
  }

  commentLiked() {
    this.heartIcon = this.heartIcon === HeartIconStates.DEFAULT ?
      HeartIconStates.LIKED : HeartIconStates.DEFAULT;
    if (this.heartIcon === HeartIconStates.LIKED) {
      this.isThisCommentLiked = true;
    } else {
      this.isThisCommentLiked = false;
    }
  }

}
