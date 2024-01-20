import { Component, OnInit } from "@angular/core";
import { RestapiService } from "src/app/service/restapi.service";
import { ChartType, ChartOptions, ChartConfiguration } from "chart.js";
import { TrainingApiServiceService } from "src/app/service/training-api-service.service";
import { AttendenceService } from "src/app/service/attendence.service";
@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    constructor(
        private service: RestapiService,
        private trainingService: TrainingApiServiceService,
        private attendanceService: AttendenceService
    ) {}
    numberOfEmployees: number=0;
    projects: Set<string> = new Set<string>();
    title = "ng2-charts-demo";
    trainingsToday: number = 0;
    trainingsThisWeek: number = 0;
    totalUniqueProjects: number = 0;
    attendanceData: any[] = [];
    employeesWorkingFromOffice: any[] = [];
    employeesWorkingFromHome:any[]=[]
    employeesLeave:any[]=[]
    ngOnInit(): void {
        this.getEmployees();
        this.trainingData();
       this.getWFO()
       this.getWFH();
        this.getEmployeeLeave()
      
    }
    getEmployees() {
        this.service.getEmployee().subscribe((res: any[]) => {
            console.log("res", res);
            this.numberOfEmployees = res.length;
            this.numberOfEmployees = res.length;
            this.projects = res.reduce((allProjects, employee) => {
                const projectsArray = employee.Project.split(",").map(
                    (project: string) => project.trim()
                );

                const nonEmptyProjects = projectsArray.filter(
                    (project: string) => project !== ""
                );

                nonEmptyProjects.forEach((project: any) => {
                    allProjects.add(project);
                });

                return allProjects;
            }, new Set<string>());

            this.totalUniqueProjects = this.projects.size;
        });
    }
    trainingData() {
        this.trainingService.getTrainingData().subscribe((data: any[]) => {
            console.log("data", data);

            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            this.trainingsToday = data.filter((training: any) => {
                const startDate = new Date(training.StartDate);
                const endDate = new Date(training.EndDate);
                return startDate <= today && today <= endDate;
            }).length;
            this.trainingsThisWeek = data.filter((training: any) => {
                const startDate = new Date(training.StartDate);
                return startDate >= startOfWeek && startDate <= endOfWeek;
            }).length;
        });
    }
    getWFO() {
        this.attendanceService.getAttendence().subscribe(
            (data) => {
                this.attendanceData = data;
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const currentDateFormatted = `${year}-${month}-${day}`;

                this.employeesWorkingFromOffice = this.attendanceData.filter(
                    (employeeRecord: any) => {
                        const attendanceRecord = employeeRecord.values.find(
                            (record: any) => {
                                return record.hasOwnProperty(currentDateFormatted);
                            }
                        );
        
                        return (
                            attendanceRecord && attendanceRecord[currentDateFormatted] === "O"
                        );
                    }
                ); 
            }
            
        );
        this.employeesWorkingFromOffice = this.employeesWorkingFromOffice;
       

    }
    getWFH(){
        this.attendanceService.getAttendence().subscribe(
            (data) => {
                this.attendanceData = data;
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const currentDateFormatted = `${year}-${month}-${day}`;
            this.employeesWorkingFromHome = this.attendanceData.filter(
                (employeeRecord: any) => {
                    const attendanceRecord = employeeRecord.values.find(
                        (record: any) => {
                            return record.hasOwnProperty(currentDateFormatted);
                        }
                    );
    
                    return (
                        attendanceRecord && attendanceRecord[currentDateFormatted] === "H"
                    );
                }
            );
            }
            
        );
        this.employeesWorkingFromHome = this.employeesWorkingFromHome;
           
    
        
    }
    getEmployeeLeave(){
        this.attendanceService.getAttendence().subscribe(
            (data) => {
                this.attendanceData = data;
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const currentDateFormatted = `${year}-${month}-${day}`;

                this.employeesLeave = this.attendanceData.filter(
                    (employeeRecord: any) => {
                        const attendanceRecord = employeeRecord.values.find(
                            (record: any) => {
                                return record.hasOwnProperty(currentDateFormatted);
                            }
                        );
        
                        return (
                            attendanceRecord && attendanceRecord[currentDateFormatted] === "L"
                        );
                    }
                );
            }
            
        );
        this.employeesLeave = this.employeesLeave;
}
}
