import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { IndiadashboardComponent } from './modules/indiadashboard/indiadashboard.component';
import { MumbaidashboardComponent } from './modules/mumbaidashboard/mumbaidashboard.component';
import { WorldDashboardComponent } from './modules/worlddashboard/worlddashboard.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: WorldDashboardComponent
  }, {
    path: 'indiadashboard',
    component: IndiadashboardComponent
  ,
  {
    path: 'mumbaidashboard',
    component: MumbaidashboardComponent
  }}]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
