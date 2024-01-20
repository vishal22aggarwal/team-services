import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { CoreModule } from "src/app/core/core.module";

import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
@NgModule({
    declarations: [EmployeeComponent,EmployeeListComponent],
    imports: [
      CommonModule, 
      EmployeeRoutingModule,RouterModule,CoreModule,FormsModule
    ],
})
export class EmployeeModule {}
