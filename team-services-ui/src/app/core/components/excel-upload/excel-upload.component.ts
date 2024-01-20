import { Component } from "@angular/core";
import { DataService, ExcelUploadService } from "../../services";
import { tap } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogRef } from "@angular/material/dialog";
import * as XLXS from "xlsx";
import { AppConstants } from "../../config/app-constants";
import { RestapiService } from "src/app/service/restapi.service";
import { LoginService } from "src/app/service/login.service";
@Component({
    selector: "app-excel-upload",
    templateUrl: "./excel-upload.component.html",
    styleUrls: ["./excel-upload.component.css"],
})
export class ExcelUploadComponent {
    data: any[] = [];
    selectedFile: File | null;
    apiResponse: any;
    isUploadClicked = false;
    constructor(
        private excelImportService: ExcelUploadService,
        public dialogRef: MatDialogRef<ExcelUploadComponent>,
        private dataService: DataService,
        private employeeService: RestapiService,
        private authService: LoginService
    ) {}
    recordCount: number = 0;
    // Uploading Excel File
    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        const target: DataTransfer = <DataTransfer>event.target;

        if (target.files.length !== 1)
            throw new Error("Cannot use multiple files");
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLXS.WorkBook = XLXS.read(bstr, { type: "binary" });
            const wsname: string = wb.SheetNames[0];
            const ws: XLXS.WorkSheet = wb.Sheets[wsname];
            console.log(ws);
            this.data = XLXS.utils.sheet_to_json(ws, {
                defval: "",
            });

            console.log("this.data", this.data);
        };
        reader.readAsBinaryString(target.files[0]);
    }
    // On Upload employee list displayed in the employee table
    onUpload() {
        if (!this.selectedFile) {
            console.error("No file selected.");
            return;
        }

        for (let i = 0; i < this.data.length; i++) {
            const singleEmployeeData = this.data[i];
            console.log("object", singleEmployeeData);
            this.employeeService
                .saveEmployee(singleEmployeeData)
                .subscribe((res) => {
                    console.log("Employeed added", res);
                });

            let userData = {
                email: `${singleEmployeeData["EmpId"]}@test.com`,
                password: `${singleEmployeeData["EmpId"]}@1234`,
                role: "viewer",
                EmpId: `${singleEmployeeData["EmpId"]}`,
                Name: `${singleEmployeeData["Name"]}`,
            };

            console.log("userData", userData);
            this.authService.addUser(userData).subscribe((res) => {
                console.log("user added", res);
            });

            setTimeout(() => {
                this.dataService.setSharedData(AppConstants.DATA_SAVED);
            }, 2000);
        }
        this.recordCount = this.data.length;
        this.isUploadClicked = true;
        console.log("readcount", this.recordCount);
    }
    // close popup
    onClick(): void {
        this.dialogRef.close();
    }
    ngOnDestroy(): void {}
}
