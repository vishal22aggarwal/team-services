import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../service/login.service";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { SessionStorageService } from "../core/services";
import { AppConstants } from "../core/config/app-constants";
@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    loginError: boolean = false;
    loginResponse$: Observable<any>;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private sessionStorageService: SessionStorageService
    ) {}
    private ngUnsubscribe = new Subject();
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });
    }
    // submitting the values
    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
            this.loginError = false;
        }
    }
    // login
    onLogin() {
        if (this.loginForm.invalid) {
            return;
        }

        const { email, password } = this.loginForm.value;

        this.loginService.login(email, password).subscribe((users) => {
            const loggedInUser = this.loginService.getLoggedInUser();
            if (loggedInUser) {
                this.sessionStorageService.setItem(
                    AppConstants.USER_INFO,
                    loggedInUser
                );
                this.router.navigate(["/dashboard"]);
            } else {
                this.loginError = true;
            }
        });
    }
}
