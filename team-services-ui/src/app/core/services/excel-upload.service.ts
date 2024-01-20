import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,Observer } from "rxjs";
import * as XLSX from 'xlsx';
import { ApiEndpoints } from "../config/api-endpoints";
@Injectable({
    providedIn: "root",
})
export class ExcelUploadService {
    constructor(private http: HttpClient) {}

    onUpload(employees: any[]): Observable<any> {
        return this.http.post(ApiEndpoints.EMPLOYEEDATA, employees);
    }
   
}
