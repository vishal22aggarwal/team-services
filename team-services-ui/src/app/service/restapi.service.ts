import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ApiEndpoints } from "../core/config/api-endpoints";
@Injectable({
    providedIn: "root",
})
export class RestapiService {
    constructor(private http: HttpClient) {}
    getEmployee(): Observable<any> {
        return this.http.get<any>(ApiEndpoints.EMPLOYEEDATA);
    }
    saveEmployee(data: any) {
        console.log("empData", data);
        return this.http.post(ApiEndpoints.EMPLOYEEDATA, data);
    }
    getEmployeeByTable(code: any) {
        return this.http.get<any>(ApiEndpoints.EMPLOYEEDATA + code);
    }
    updateEmployee(data: any): Observable<any> {
        return this.http.put<any>(
            `${ApiEndpoints.EMPLOYEEDATA}/${data.id}`,
            data
        );
    }
    fetchData(): Observable<any> {
        // Replace with your actual API endpoint
        return this.http.get<any>(ApiEndpoints.EMPLOYEEDATA);
    }
}
