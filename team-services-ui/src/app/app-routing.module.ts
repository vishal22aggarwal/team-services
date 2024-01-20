import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import {TrainingModule} from "./feature/training/training.module"
import { AuthGuard } from "./core/services/auth.guard";
import { EmployeeListComponent } from "./feature/employee/components/employee-list/employee-list.component";
import { ListComponent } from "./core/components/list/list.component";
import { DashboardModule } from "./feature/dashboard/dashboard.module";
import { WorkFromOfficeModule } from "./feature/work-from-office/work-from-office.module";
const routes: Routes = [
    { path: "", redirectTo: "team-members", pathMatch: "full" },
    {
        path: "team-members",
        canActivate: [AuthGuard],
        loadChildren: () =>
            import("./feature/employee/employee.module").then(
                (m) => m.EmployeeModule
            ),
        component:EmployeeListComponent
        
    },
    { path: "login", component: LoginPageComponent },
    {
        path: "training",
        loadChildren: () =>
            import("./feature/training/training.module").then((m) => m.TrainingModule),
        data: { preload: true },
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("./feature/dashboard/dashboard.module").then((m) => m.DashboardModule),
        data: { preload: true },
    },
    {
        path: "work-from-office",
        loadChildren: () =>
            import("./feature/work-from-office/work-from-office.module").then((m) => m.WorkFromOfficeModule),
        data: { preload: true },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
