import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeComponent } from "./employee.component";



const routes: Routes = [   

           
    
    {
        path:'team-members',
        component:EmployeeListComponent
    },
   
   
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule {}
