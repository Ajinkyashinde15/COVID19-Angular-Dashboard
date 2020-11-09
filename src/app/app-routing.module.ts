import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ContactComponent } from './modules/contact/contact.component';
import { CoronaforcastComponent } from './modules/coronaforcast/coronaforcast.component';
import { CovidmapComponent } from './modules/covidmap/covidmap.component';
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
  }
  ,
  {
    path: 'mhdashboard',
    component: MumbaidashboardComponent
  }
  ,
  {
    path: 'covidmap',
    component: CovidmapComponent
  }, {
    path: 'forcast',
    component: CoronaforcastComponent
  }, {
    path: 'contact',
    component: ContactComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
