import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ChangeProfilePicComponent } from './settings-page/change-profile-pic/change-profile-pic.component';

@NgModule({
  declarations: [SettingsComponent, SettingsPageComponent, ChangeProfilePicComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
