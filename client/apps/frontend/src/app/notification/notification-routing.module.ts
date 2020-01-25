import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPageComponent,
    children: [
      {
        path: '**',
        component: NotificationsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
