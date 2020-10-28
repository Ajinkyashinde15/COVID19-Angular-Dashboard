import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports : [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
