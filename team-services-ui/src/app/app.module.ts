import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { EmployeeModule } from "./feature/employee/employee.module";
import { MatDialogModule } from "@angular/material/dialog";
import { LoginPageComponent } from "./login-page/login-page.component";
import { EmployeeRoutingModule } from "./feature/employee/employee-routing.module";
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ProgressIndicatorService } from "./service/progress-indicator.service";
import { ProgressInterceptor } from "./progress-indicator/progress-indicator.interceptor";
@NgModule({
    declarations: [AppComponent, LoginPageComponent, ProgressIndicatorComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        ReactiveFormsModule,
        EmployeeModule,
        MatDialogModule,
        MatIconModule,
        HttpClientModule
    ],
    
    exports: [],
    providers: [ ProgressIndicatorService,
        { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true },],
    bootstrap: [AppComponent],
})
export class AppModule {}
