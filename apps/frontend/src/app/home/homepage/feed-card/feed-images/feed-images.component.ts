import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageProperties } from '../../../../app.constants';

@Component({
  selector: 'ia-feed-images',
  templateUrl: './feed-images.component.html',
  styleUrls: ['./feed-images.component.scss']
})
export class FeedImagesComponent implements OnInit {
  @Input() media: any;
  @Input() feedId: string;
  @Output() imageLiked = new EventEmitter();
  defaultImage = ImageProperties.IMAGE_PLACEHOLDER;
  constructor() { }

  ngOnInit() {
  }

  onDoubleClick() {
    this.imageLiked.emit(this.feedId);
  }

}
