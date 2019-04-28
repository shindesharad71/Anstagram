import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'ia-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

}
