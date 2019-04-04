import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedCardComponent } from './homepage/feed-card/feed-card.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [HomepageComponent, FeedCardComponent, CreatePostComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
