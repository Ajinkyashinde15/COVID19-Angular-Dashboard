import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import highmaps from '../../node_modules/highcharts/modules/map.src';
import { MapChart } from 'angular-highcharts';

export function highchartsModules() {
  return [highmaps];
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ChartModule
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, MapChart],
  bootstrap: [AppComponent]
})
export class AppModule { }
