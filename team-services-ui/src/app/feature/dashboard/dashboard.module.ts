import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { DashboardBarchartComponent } from './dashboard-barchart/dashboard-barchart.component';
import { DashboardPiechartComponent } from './dashboard-piechart/dashboard-piechart.component';
import { NgxEchartsModule } from 'ngx-echarts';
const routes: Routes = [
  {
   path: "", 
   component: DashboardComponent
  }
  ];
@NgModule({
  declarations: [DashboardComponent, DashboardBarchartComponent, DashboardPiechartComponent],
  imports: [
    CommonModule,NgxEchartsModule.forRoot({
      echarts:()=>import('echarts')
    }), RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
