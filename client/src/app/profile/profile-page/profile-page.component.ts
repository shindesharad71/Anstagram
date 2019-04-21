import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { UserProfile } from '../../app.constants';

@Component({
  selector: 'ia-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userInfo: any;
  defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;
  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const url: string = this.router.url;
    const username: string = url.split('/')[1];

    if (username.length > 1) {
      this.httpService.get(`profile/${username}`).subscribe((res: any) => {
        if (res) {
          this.userInfo = res;
        } else {
          this.router.navigateByUrl('404');
        }
      }, err => {
        console.log(err);
        this.router.navigateByUrl('404');
      });
    } else {
      this.router.navigateByUrl('404');
    }
  }

}
