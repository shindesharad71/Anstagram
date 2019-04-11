import { Component, OnInit, Input } from '@angular/core';
import { ImageProperties } from '../../../../app.constants';

@Component({
  selector: 'ia-feed-images',
  templateUrl: './feed-images.component.html',
  styleUrls: ['./feed-images.component.scss']
})
export class FeedImagesComponent implements OnInit {
  @Input() media: any;
  defaultImage = ImageProperties.IMAGE_PLACEHOLDER;
  constructor() { }

  ngOnInit() {
  }

}
