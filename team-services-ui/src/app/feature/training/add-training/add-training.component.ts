import { Component, Inject, OnDestroy } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from "@angular/forms";
import { Employee } from "src/app/core/interfaces/training-employee.interface";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TrainingApiServiceService } from "src/app/service/training-api-service.service";
import { RestapiService } from "src/app/service/restapi.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDatepickerToggle } from "@angular/material/datepicker";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AppConstants } from "src/app/core/config/app-constants";
import { DataService } from "src/app/core/services";

@Component({
    selector: "app-add-training",
    templateUrl: "./add-training.component.html",
    styleUrls: ["./add-training.component.css"],
})
export class AddTrainingComponent {
    dataColumns: string[] = [];
    closeMessage = "close using directive";
    dynamicForm: FormGroup;
    inpuData: any;
    employees: Employee[] = [];
    constructor(
        public dialogRef: MatDialogRef<AddTrainingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private addTrainingService: TrainingApiServiceService,
        private restApiService: RestapiService,
        private dataService: DataService
    ) {}
    formValidation() {
        this.inpuData = this.data;
        this.dynamicForm = this.formBuilder.group({
            TrainingTitle: [this.data["TrainingTitle"], Validators.required],
            TrainingType: [this.data["TrainingType"], Validators.required],
            PlannedDate: [this.data["PlannedDate"], Validators.required],
            StartDate: [this.data["StartDate"]?? ""],
            EndDate: [this.data["EndDate"] ?? ""],
            Reference: [this.data["Reference"] ?? ""],
            Name: [this.data["Name"],Validators.required],
            Status: [this.data["Status"] ?? ""],
            Mode: [this.data["Mode"],Validators.required],
        });
    }

    trainingType = [
        { value: "Self", label: "Self" },
        { value: "Corporate", label: "Corporate" },
    ];
    status = [
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Done", label: "Done" },
        { value: "Cancelled", label: "Cancelled" },
    ];
    mode = [
        { value: "online", label: "online" },
        { value: "offline", label: "offline" },
    ];
    // form validation
    ngOnInit(): void {
        this.formValidation();
        this.restApiService.getEmployee().subscribe((data) => {
            this.employees = data;
        });
    }
   
    onSave() {
        if (!this.data.id) {
            console.log(this.dynamicForm.value);
            const names: string[] = this.dynamicForm.value.Name;
            names.forEach((memberName) => {
                const data = { ...this.dynamicForm.value, Name: memberName };
                this.addTrainingService
                    .saveTrainingData(data)
                    .subscribe((res) => {
                        console.log("res", res);
                        this.dataService.setSharedData(AppConstants.DATA_SAVED);
                    });
            });
        } else {
            const data: any = {
                ...this.data,
                ...this.dynamicForm.value,
            };
            this.addTrainingService.updateTraining(data).subscribe((res) => {
                console.log("res", res);
                
                this.dialogRef.close(data);
                this.dataService.setSharedData(AppConstants.DATA_SAVED);
            });
        }
    }
}
