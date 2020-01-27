import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '../../../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'ia-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userInfo;
  username: string;
  defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToChangeProfile() {
    this.router.navigateByUrl(`settings/change-profile-pic`);
  }

}
