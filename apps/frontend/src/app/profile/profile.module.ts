import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileInfoComponent } from './profile-page/profile-info/profile-info.component';
import { ProfileGalleryComponent } from './profile-page/profile-gallery/profile-gallery.component';
import { PostsGridViewComponent } from './profile-page/posts-grid-view/posts-grid-view.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePageComponent, ProfileInfoComponent, ProfileGalleryComponent, PostsGridViewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
