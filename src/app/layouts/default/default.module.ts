import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { WorldDashboardComponent } from 'src/app/modules/worlddashboard/worlddashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorldDashboardService } from 'src/app/modules/worlddashboard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DefaultComponent,
    WorldDashboardComponent,
    PostsComponent
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
    HttpClientModule
  ],
  providers: [
    WorldDashboardService
  ]
})
export class DefaultModule { }
