import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '../../../app.constants';

@Component({
  selector: 'ia-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userInfo;
  defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;
  constructor() { }

  ngOnInit() {
  }

}
