import { Component, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from "@angular/forms";

import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RestapiService } from "src/app/service/restapi.service";

import { DataService } from "../../services";
import { AppConstants } from "../../config/app-constants";
import { LoginService } from "src/app/service/login.service";
@Component({
    selector: "app-table-add-popup",
    templateUrl: "./table-add-popup.component.html",
    styleUrls: ["./table-add-popup.component.css"],
})
export class TableAddPopupComponent implements OnInit, OnDestroy {
    dataColumns: string[] = [];
    closeMessage = "close using directive";
    dynamicForm: FormGroup;
    employeeData: any;
    constructor(
        public dialogRef: MatDialogRef<TableAddPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private restapiService: RestapiService,
        private dataService: DataService,
        private authService: LoginService
    ) {
        this.dataColumns = Object.keys(this.data).filter(
            (col) => col != "Icons" && col != "id"
        );
    }
    // form validation
    ngOnInit(): void {
        this.dynamicForm = this.formBuilder.group({
            EmpId: [this.data["EmpId"], Validators.required],
            Name: [this.data["Name"], Validators.required],
            Grade: [this.data["Grade"], Validators.required],
            Designation: [this.data["Designation"], Validators.required],
            Project: [this.data["Project"] ?? ""],
            Skills: [this.data["Skills"] ?? ""],
            Location: [this.data["Location"] ?? ""],
            ContactNo: [this.data["ContactNo"] ?? ""],
        });
    }
    // on click on save employee table will be added id add a table and will be updated if update a table
    onSave() {
        if (!this.data.id) {
            this.restapiService
                .saveEmployee(this.dynamicForm.value)
                .subscribe((res) => {
                    console.log("res", res);
                    this.dataService.setSharedData(AppConstants.DATA_SAVED);
                });
            let userData = {
                email: `${this.dynamicForm.value["EmpId"]}@test.com`,
                password: `${this.dynamicForm.value["EmpId"]}@1234`,
                role: "viewer",
                EmpId: `${this.dynamicForm.value["EmpId"]}`,
                Name: `${this.dynamicForm.value["Name"]}`,
            };

            console.log("userData", userData);
            this.authService.addUser(userData).subscribe((res) => {
                console.log("user added", res);
            });
        } else {
            const updatedEmployee: any = {
                ...this.data,
                ...this.dynamicForm.value,
            };
            this.restapiService
                .updateEmployee(updatedEmployee)
                .subscribe((response) => {
                    this.dialogRef.close(updatedEmployee);
                    this.dataService.setSharedData(AppConstants.DATA_SAVED);
                });
        }
    }
    ngOnDestroy(): void {}
}
