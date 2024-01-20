import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from "@angular/material/table";
import { TableAddPopupComponent } from "../table-add-popup/table-add-popup.component";
import { EmployeeListComponent } from "src/app/feature/employee/components/employee-list/employee-list.component";
import { Dialog } from "@angular/cdk/dialog";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoginService } from "src/app/service/login.service";
import { RestapiService } from "src/app/service/restapi.service";
import { ExcelUploadService } from "../../services";
import { ExcelUploadComponent } from "../excel-upload/excel-upload.component";
import * as XLSX from 'xlsx';
@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnChanges {
    @Input()
    listTitle: string = "";
    @Input()
    dataSource = new MatTableDataSource<any, MatTableDataSourcePaginator>([]);
    role: string;
    displayedColumns: any[] = [];
    EmpId: any;
    constructor(private loginService: LoginService, private dialog: MatDialog) {
        this.role = this.loginService.getUserRole();
        this.EmpId = this.loginService.getUserId();
    }

    @ViewChild(MatPaginator) paginator: any = MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;
    applyFilter(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }
// columns of employee table
    ngOnChanges(changes: SimpleChanges): void {
        console.log("this.dataSource.data onchanges", this.dataSource.data);
        if (this.dataSource.data.length > 0) {
            this.displayedColumns = Object.keys(this.dataSource.data[0]);
            this.displayedColumns = this.displayedColumns.filter(
                (item) => item != "id"
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.matSort;
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
    }
    // opening of dialog box
    openButton() {
        const dialogRef = this.dialog.open(TableAddPopupComponent, {
            width: "34%",

            data: {
                EmpId: "",
                Name: "",
                Grade: "",
                Designation: "",
                Project: "",
                Skills: "",
                Location: "",
                ContactNo: "",
            },
        });
        dialogRef.afterClosed().subscribe((item) => {});
    }
// edit employee
    editEmployee(employee: any) {
        console.log("emp", employee);
        const dialogRef = this.dialog.open(TableAddPopupComponent, {
            width: "35%",

            data: {
                ...employee,
            },
        });
        dialogRef.afterClosed().subscribe((item) => {});
    }
    refreshPage() {
         window.location.reload();
    }
    // open excel upload component
  openDialog(){
    this.dialog.open(ExcelUploadComponent,{
      width:'450px',
     
      
   
    })
  }
  // downloading employee table
  exportEmployeeData(): void {
    const employeeList = this.dataSource.data;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeeList);
    const workbook: XLSX.WorkBook = { Sheets: { 'employeeList': worksheet }, SheetNames: ['employeeList'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const blobUrl = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = blobUrl;
    a.target = '_blank'; // Open in a new tab/window
    a.download = 'employeeList.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up the object URL after a short delay
    
      URL.revokeObjectURL(blobUrl);
  
  }
}
