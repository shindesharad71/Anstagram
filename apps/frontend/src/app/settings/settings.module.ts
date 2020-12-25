import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { ChangeProfilePicComponent } from './settings-page/change-profile-pic/change-profile-pic.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

library.add(fas);

registerPlugin(
	FilePondPluginFileValidateType,
	FilePondPluginImagePreview,
	FilePondPluginImageExifOrientation,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
);

@NgModule({
	declarations: [
		SettingsComponent,
		SettingsPageComponent,
		ChangeProfilePicComponent
	],
	imports: [
		CommonModule,
		SettingsRoutingModule,
		FontAwesomeModule,
		FilePondModule
	]
})
export class SettingsModule {}
