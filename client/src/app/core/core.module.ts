import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { FeedService } from './services/feed/feed.service';
import { CommentService } from './services/comment/comment.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
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
  ]
})
export class CoreModule { }
