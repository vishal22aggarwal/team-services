import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ApiEndpoints } from "../core/config/api-endpoints";
@Injectable({
    providedIn: "root",
})
export class AttendenceService {
    constructor(private http: HttpClient) {}
    getAttendence(): Observable<any> {
        return this.http.get<any>(ApiEndpoints.EMPLOYEEATTENDENCES);
    }
    postAttendence(data: any) {
        console.log("attendence", data);
        return this.http.post(ApiEndpoints.EMPLOYEEATTENDENCES, data);
    }

    updateAttendence(data: any) {
        console.log("updated attendence", data);
        return this.http.patch(
            `${ApiEndpoints.EMPLOYEEATTENDENCES}/${data.id}`,
            data
        );
    }
    getEmployeeAttendanceByMonth(month: string): Observable<any> {
        const url = `${ApiEndpoints.EMPLOYEEATTENDENCES}?month=${month}`;
        return this.http.get(url);
    }

    getEmployeeAttendanceByMonthAndName(
        month: string,
        name: string
    ): Observable<any> {
        const url = `${ApiEndpoints.EMPLOYEEATTENDENCES}?month=${month}&name=${name}`;
        return this.http.get(url);
    }
}
