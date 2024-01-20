import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./components/list/list.component";
import { NavbarCmpComponent } from "./components/navbar-cmp/navbar-cmp.component";
import { CoreComponent } from "./core.component";
// import { LoginPageComponent } from "../login-page/login-page.component";
const routes:Routes=[
    // {
    //     path:'/login',
    //     component:LoginPageComponent
    // }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoreRoutingModule {}