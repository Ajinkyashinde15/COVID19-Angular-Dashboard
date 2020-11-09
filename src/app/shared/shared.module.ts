import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { TwoseriesAreaComponent } from './widgets/twoseries-area/twoseries-area.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import highmaps from '../../../node_modules/highcharts/modules/map.src';
import { MapChart } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

export function highchartsModules() {
  return [highmaps];
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TwoseriesAreaComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    ChartModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TwoseriesAreaComponent
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, MapChart],
})
export class SharedModule { }
