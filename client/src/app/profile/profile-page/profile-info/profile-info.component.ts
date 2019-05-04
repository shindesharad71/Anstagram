import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '../../../app.constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'ia-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userInfo;
  username: string;
  defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  navigateToChangeProfile() {
    this.router.navigateByUrl(`settings/change-profile-pic`);
  }

}
