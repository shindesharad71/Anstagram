import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Icon Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedCardComponent } from './homepage/feed-card/feed-card.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';

@NgModule({
  declarations: [HomepageComponent, FeedCardComponent, NavbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
