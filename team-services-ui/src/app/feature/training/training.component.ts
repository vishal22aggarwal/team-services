import {
    Component,
    ViewChild,
    OnInit,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from "@angular/material/table";
import { AddTrainingComponent } from "./add-training/add-training.component";
import { Dialog } from "@angular/cdk/dialog";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TrainingApiServiceService } from "src/app/service/training-api-service.service";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatIcon } from "@angular/material/icon";
import { DataService } from "src/app/core/services";
import { Subscription } from "rxjs";
import { AppConstants } from "src/app/core/config/app-constants";
import { LoginService } from "src/app/service/login.service";
import * as XLSX from "xlsx";
import { RestapiService } from "src/app/service/restapi.service";
import { Employee } from "src/app/core/interfaces/training-employee.interface";
import { Router } from "@angular/router";
@Component({
    selector: "app-training",
    templateUrl: "./training.component.html",
    styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit, OnChanges {
    displayedColumns = [
        "Name",
        "TrainingTitle",
        "TrainingType",
        "Mode",
        "PlannedDate",
        "StartDate",
        "EndDate",
        "Status",
        "Actions",
    ];
    copiedClass: string = "hidden";
    dataSource: MatTableDataSource<Element>;
    EmpId: any;
    employees: Employee[] = [];
    clickRowNo: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    role: string;
    constructor(
        private dialog: MatDialog,
        private addTrainingService: TrainingApiServiceService,
        private dataService: DataService,
        private loginService: LoginService,
        private restApiService: RestapiService,
        private router: Router,
        private clipboard: Clipboard
    ) {
        this.dataSource = new MatTableDataSource<Element>([]);
        this.dataSource = new MatTableDataSource();
        this.role = this.loginService.getUserRole();
        this.EmpId = this.loginService.getUserId();
    }

    fetchTraining() {
        this.addTrainingService.getTrainingData().subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    private subscription: Subscription;
    ngOnInit(): void {
        this.fetchTraining();

        this.subscription = this.dataService
            .getSharedData()
            .subscribe((res) => {
                if (res === AppConstants.DATA_SAVED) {
                    this.fetchTraining();
                }
                this.restApiService.getEmployee().subscribe((data) => {
                    this.employees = data;
                });
            });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dataSource.data.length > 0) {
            this.displayedColumns = this.displayedColumns.filter(
                (item) => item != "id"
            );
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    openButton() {
        const dialogRef = this.dialog.open(AddTrainingComponent, {
            width: "34%",

            data: {
                Name: "",
                TrainingTitle: "",
                TrainingType: "",
                Mode: "",
                PlannedDate: "",
                StartDate: "",
                Actions: "",
                Status: "",
            },
        });
        dialogRef.afterClosed().subscribe((item) => {});
    }
    editTraining(training: any) {
        {
            const dialogRef = this.dialog.open(AddTrainingComponent, {
                width: "35%",

                data: {
                    ...training,
                },
            });
            dialogRef.afterClosed().subscribe((item) => {});
        }
    }
    applyFilter(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    isEditAllowed(teamMember: string) {
        return (
            teamMember.indexOf(this.EmpId) > -1 ||
            this.role === "admin" ||
            this.role === "manager"
        );
    }

    copyLink(link: string, index: number) {
        this.clickRowNo = index;
        this.copiedClass = "";
        this.clipboard.copy(link);

        setTimeout(() => {
            this.clickRowNo = -1;
        }, 2000);
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    exportEmployeeData(): void {
        const employeeList = this.dataSource.data;
        const worksheet: XLSX.WorkSheet =
            XLSX.utils.json_to_sheet(employeeList);
        const workbook: XLSX.WorkBook = {
            Sheets: { employeeList: worksheet },
            SheetNames: ["employeeList"],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const blobUrl = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = blobUrl;
        a.target = "_blank"; // Open in a new tab/window
        a.download = "employeeList.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up the object URL after a short delay

        URL.revokeObjectURL(blobUrl);
    }
}
