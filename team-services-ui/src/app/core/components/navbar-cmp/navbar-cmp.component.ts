import { Component, OnInit } from "@angular/core";

import { Router, RouterModule } from "@angular/router";
import { LoginService } from "src/app/service/login.service";
import { User } from "../../interfaces";
@Component({
    selector: "app-navbar-cmp",
    templateUrl: "./navbar-cmp.component.html",
    styleUrls: ["./navbar-cmp.component.css"],
})
export class NavbarCmpComponent implements OnInit {
    loggedInUser: User | undefined;
    constructor(private loginService: LoginService, private router: Router) {
        this.loggedInUser = loginService.getLoggedInUser();
    }
    // logout user
    logout() {
        this.loginService.logout();
        this.router.navigate(["/login"]);
    }
    ngOnInit() {}
}
