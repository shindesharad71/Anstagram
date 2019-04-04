import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { AuthService } from './services/auth/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { FeedService } from './services/feed/feed.service';
import { CommentService } from './services/comment/comment.service';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [LoaderComponent, NotificationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule
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
    FeedService,
    CommentService
  ],
  entryComponents: [
    LoaderComponent
  ],
  exports: [NotificationComponent, FontAwesomeModule]
})
export class CoreModule { }
