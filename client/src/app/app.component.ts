import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { LoaderService } from './core/components/loader/loader.service';
import { AuthService } from './core/services/auth/auth.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'ia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  // tslint:disable-next-line: max-line-length
  constructor(private loaderService: LoaderService, private vcr: ViewContainerRef, private authService: AuthService, private swUpdate: SwUpdate) {
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
}
