import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ia-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {
  isSelectedTab = 'Posts';
  posts: any[] = [];
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.tabToggle(this.isSelectedTab);
  }

  tabToggle(tabItem) {
    const url: string = this.router.url;
    const username: string = url.split('/')[1];
    this.isSelectedTab = tabItem ? tabItem : 'Posts';
    this.httpService.get(`profile/${username}/${this.isSelectedTab}`).subscribe((res: any) => {
      console.log(res);
      this.posts = res;
    }, err => {
      console.log(err);
    });
  }

}
