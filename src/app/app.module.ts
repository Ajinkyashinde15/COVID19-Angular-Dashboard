import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { IndiadashboardComponent } from './modules/indiadashboard/indiadashboard.component';
import { MumbaidashboardComponent } from './modules/mumbaidashboard/mumbaidashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    IndiadashboardComponent,
    MumbaidashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
