import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// tslint:disable-next-line: max-line-length
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageExifOrientation, FilePondPluginImageCrop, FilePondPluginImageTransform);


import { SettingsComponent } from './settings.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ChangeProfilePicComponent } from './settings-page/change-profile-pic/change-profile-pic.component';


@NgModule({
  declarations: [SettingsComponent, SettingsPageComponent, ChangeProfilePicComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FontAwesomeModule,
    FilePondModule
  ]
})
export class SettingsModule { }
