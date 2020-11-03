import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultComponent } from './default.component';
import { WorldDashboardComponent } from 'src/app/modules/worlddashboard/worlddashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorldDashboardService } from 'src/app/modules/worlddashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { IndiadashboardComponent } from 'src/app/modules/indiadashboard/indiadashboard.component';
import { MumbaidashboardComponent } from 'src/app/modules/mumbaidashboard/mumbaidashboard.component';
import { IndiadashboardService } from 'src/app/modules/indiadashboard.service';

@NgModule({
  declarations: [
    DefaultComponent,
    WorldDashboardComponent,
    IndiadashboardComponent,
    MumbaidashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [
    WorldDashboardService,
    DatePipe,
    IndiadashboardService
  ]
})
export class DefaultModule { }
