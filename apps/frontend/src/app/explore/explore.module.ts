import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';

@NgModule({
  declarations: [ExploreComponent, ExplorePageComponent],
  imports: [
    CommonModule,
    ExploreRoutingModule
  ]
})
export class ExploreModule { }
