import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ia-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  logout() {
    if (this.authService.removeToken()) {
      this.router.navigateByUrl('/login');
    }
  }

}
