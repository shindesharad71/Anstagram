import { Component, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { LoaderService } from './core/components/loader/loader.service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'ia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(private loaderService: LoaderService, private vcr: ViewContainerRef, private authService: AuthService) {
    this.loaderService.setViewContainer(vcr);
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.checkToken();
  }
}
