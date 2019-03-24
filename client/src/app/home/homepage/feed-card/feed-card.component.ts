import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ia-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
  @Input() feed;
  heartIcon = '/assets/icons/heart-icon.png';

  constructor() { }

  ngOnInit() {
  }

  like() {
    this.heartIcon = this.heartIcon === '/assets/icons/heart-icon.png' ?
      '/assets/icons/heart-red-icon.png' : '/assets/icons/heart-icon.png';
  }

}
