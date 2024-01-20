import { Component } from "@angular/core";
import { LoginService } from "./service/login.service";
import { User } from "./core/interfaces";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "internaldashboard";
    loggedinUser: User | undefined;
    
    constructor(public loginService: LoginService) {}
}
