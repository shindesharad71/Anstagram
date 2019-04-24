import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NgxHotjarModule } from 'ngx-hotjar';

import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxHotjarModule.forRoot('1293837')
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
