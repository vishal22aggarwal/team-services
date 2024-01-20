import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeModule } from './employee/employee.module';
import { CoreModule } from '../core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkFromOfficeComponent } from './work-from-office/work-from-office.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WorkFromOfficeComponent,

  ],
  imports: [
    CommonModule,
    
    
  ]
})
export class FeatureModule { }
