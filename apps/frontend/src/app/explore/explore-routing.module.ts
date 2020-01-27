import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorePageComponent } from './explore-page/explore-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePageComponent,
    children: [
      {
        path: '**',
        component: ExplorePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
