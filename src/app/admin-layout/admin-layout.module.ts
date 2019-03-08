import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from'./admin-layout.routing';
import { DashboardComponent} from '../dashboard/dashboard.component';
import { TableComponent } from '../table/table.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SimpleTableComponent } from '../simple-table/simple-table.component';

import { 
  MatButtonModule, 
  MatInputModule, 
  MatRippleModule, 
  MatFormFieldModule, 
  MatTooltipModule, 
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent, 
    TableComponent, 
    UserProfileComponent,
    SimpleTableComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(AdminLayoutRoutes), 
    MatButtonModule, 
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class AdminLayoutModule { }
