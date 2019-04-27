import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ia-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {
  isSelectedTab = 'Posts';
  constructor() { }

  ngOnInit() {
  }

  tabToggle(tabItem) {
    this.isSelectedTab = tabItem ? tabItem : 'Posts';
  }

}
