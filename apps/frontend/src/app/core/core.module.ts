import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { NotificationComponent } from './components/notification/notification.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { InterceptorService } from './services/interceptor.service';

library.add(fas);

registerPlugin(
	FilePondPluginFileValidateType,
	FilePondPluginImagePreview,
	FilePondPluginImageExifOrientation,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
);

@NgModule({
	declarations: [LoaderComponent, NotificationComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		FilePondModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true
		},
		AuthService,
		LoaderService,
		AuthGuardService,
		HttpService
	],
	entryComponents: [LoaderComponent],
	exports: [
		NotificationComponent,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		FilePondModule
	]
})
export class CoreModule {}
