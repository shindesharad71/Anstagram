import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AuthService } from './services/auth/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { NotificationComponent } from './components/notification/notification.component';
import { HttpService } from './services/http/http.service';

@NgModule({
  declarations: [LoaderComponent, NotificationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FilePondModule,
    LazyLoadImageModule
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
  entryComponents: [
    LoaderComponent
  ],
  exports: [
    NotificationComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FilePondModule,
    LazyLoadImageModule
  ]
})
export class CoreModule { }
