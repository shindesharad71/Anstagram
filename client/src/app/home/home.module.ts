import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Icon Imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FeedCardComponent } from './homepage/feed-card/feed-card.component';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [HomepageComponent, FeedCardComponent, CreatePostComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    FilePondModule
  ]
})
export class HomeModule { }
