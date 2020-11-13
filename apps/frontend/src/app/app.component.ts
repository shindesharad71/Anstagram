import {
	AfterViewInit,
	Component,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationStart,
	Router
} from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './core/components/loader/loader.service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
	selector: 'ia-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	loading = true;
	isUserLoggedIn = false;
	constructor(
		private loaderService: LoaderService,
		private vcr: ViewContainerRef,
		private authService: AuthService,
		private swUpdate: SwUpdate,
		private router: Router
	) {
		this.loaderService.setViewContainer(vcr);
	}

	ngOnInit() {
		this.authService.isLoggedIn.subscribe((loginStatus: any) => {
			this.isUserLoggedIn = loginStatus;
		});

		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				if (confirm('New version available. Load New Version?')) {
					window.location.reload();
				}
			});
		}
	}

	ngAfterViewInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.loading = true;
			}

			if (
				event instanceof NavigationEnd ||
				event instanceof NavigationCancel
			) {
				this.loading = false;
			}
		});
	}
}
