import { Component } from "@angular/core";
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from "@angular/material/table";
import { AppConstants } from "src/app/core/config/app-constants";
import { DataService } from "src/app/core/services";
import { RestapiService } from "src/app/service/restapi.service";

@Component({
    selector: "app-employee-list",
    templateUrl: "./employee.component.html",
    styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent {
    constructor() {}
  
}
