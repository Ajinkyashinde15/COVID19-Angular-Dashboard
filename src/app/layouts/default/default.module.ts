import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultComponent } from './default.component';
import { WorldDashboardComponent } from 'src/app/modules/worlddashboard/worlddashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorldDashboardService } from 'src/app/modules/worlddashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { IndiadashboardComponent } from 'src/app/modules/indiadashboard/indiadashboard.component';
import { MumbaidashboardComponent } from 'src/app/modules/mumbaidashboard/mumbaidashboard.component';
import { IndiadashboardService } from 'src/app/modules/indiadashboard.service';
import { CovidmapComponent } from 'src/app/modules/covidmap/covidmap.component';
import { ContactComponent } from 'src/app/modules/contact/contact.component';
import { CoronaforcastComponent } from 'src/app/modules/coronaforcast/coronaforcast.component';

@NgModule({
  declarations: [
    DefaultComponent,
    WorldDashboardComponent,
    IndiadashboardComponent,
    MumbaidashboardComponent,
    CovidmapComponent,
    CoronaforcastComponent,
    ContactComponent,
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
    MatSortModule,
  ],
  providers: [
    WorldDashboardService,
    DatePipe,
    IndiadashboardService
  ]
})
export class DefaultModule { }
