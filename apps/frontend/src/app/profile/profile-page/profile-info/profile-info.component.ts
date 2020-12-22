import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '../../../app.constants';

@Component({
	selector: 'ia-profile-info',
	templateUrl: './profile-info.component.html',
	styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
	@Input() userInfo;
	username: string;
	defaultAvatar = UserProfile.USER_DEFAULT_PROFILE_URL;

	// Icons
	iconCog = faCog;

	constructor(private router: Router) {}

	ngOnInit() {}

	navigateToChangeProfile() {
		this.router.navigateByUrl(`settings/change-profile-pic`);
	}
}
