import { Component, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { LoaderService } from './core/components/loader/loader.service';
import { AuthService } from './core/services/auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd
} from '@angular/router';

@Component({
  selector: 'ia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  loading = true;
  isUserLoggedIn = false;
  // tslint:disable-next-line: max-line-length
  constructor(private loaderService: LoaderService, private vcr: ViewContainerRef, private authService: AuthService, private swUpdate: SwUpdate, private router: Router) {
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
    this.router.events
      .subscribe((event) => {
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
