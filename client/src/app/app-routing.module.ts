import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/guards/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuardService] },
  { path: '404', component: PageNotFoundComponent },
  { path: 'notifications', loadChildren: () => import('../app/notification/notification.module').then(m => m.NotificationModule), canActivate: [AuthGuardService]},
  { path: 'explore', loadChildren: () => import('../app/explore/explore.module').then(m => m.ExploreModule), canActivate: [AuthGuardService]},
  { path: 'settings', loadChildren: () => import('../app/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuardService]},
  { path: '**', loadChildren: () => import('../app/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
