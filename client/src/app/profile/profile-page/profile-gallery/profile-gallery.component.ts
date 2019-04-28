import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'ia-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {
  isSelectedTab = 'Posts';
  posts: any[] = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.tabToggle(this.isSelectedTab);
  }

  tabToggle(tabItem) {
    this.isSelectedTab = tabItem ? tabItem : 'Posts';
    this.httpService.get(`profile/${this.isSelectedTab}`).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
