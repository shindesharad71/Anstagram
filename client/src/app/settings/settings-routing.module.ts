import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsComponent } from './settings.component';
import { ChangeProfilePicComponent } from './settings-page/change-profile-pic/change-profile-pic.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'change-profile-pic',
        component: ChangeProfilePicComponent
      },
      {
        path: '**',
        component: SettingsPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
