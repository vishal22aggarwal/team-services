import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    AfterViewInit,
} from "@angular/core";
import { number } from "echarts";
import { AttendenceService } from "src/app/service/attendence.service";
import { LoginService } from "src/app/service/login.service";

@Component({
    selector: "app-work-from-office",
    templateUrl: "./work-from-office.component.html",
    styleUrls: ["./work-from-office.component.css"],
})
export class WorkFromOfficeComponent {
    @ViewChild("monthInput", { static: false }) monthInput: ElementRef;
    role: string;
    EmpId: any;
    name: string;
    currentMonth: string;
    currentDate: Date = new Date();
    formattedDate: string;
    formattedDates: string;
    minDate: string;
    maxDate: string;
    attendanceData: any[] = [];
    constructor(
        private forecastService: AttendenceService,
        private loginService: LoginService
    ) {
        this.role = this.loginService.getUserRole();
        this.EmpId = this.loginService.getUserId();
        this.name = this.loginService.getUserName();
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const lastDay = new Date(year, this.currentDate.getMonth() + 1, 0)
            .getDate()
            .toString()
            .padStart(2, "0");
        const months = (this.currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        this.minDate = `${year}-${months}-01`;
        this.maxDate = `${year}-${months}-${lastDay}`;
        this.currentMonth = `${year}-${months}`;
    }
    attendances: any[];
    monthDates: any[] = [];
    MonthDays: any[] = [];
    wfhWfoValues: any[] = [];
    weekDays: any = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    forcastMonth: string;
    forcastDate: string;
    daysWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    selectedValuesOfDays: { [key: string]: boolean } = {};
    matchingDates: any[] = [];
    ngOnInit(): void {
        const todayDate = new Date();
        this.forcastMonth = `${todayDate.getFullYear()}-${(
            todayDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}`;

        this.getDataAsPerUserRole();
        this.forecastService.getAttendence().subscribe((data) => {
            this.attendanceData = data; // Assuming the JSON data is an array of objects
        });
    }

    getSelectedMonthForcast() {
        this.getDataAsPerUserRole();
    }

    getDataAsPerUserRole() {
        if (this.role === "admin" || this.role === "manager") {
            this.getAllEmployeeForecaseByMonth(this.forcastMonth);
        } else {
            this.getEmployeeForecastByMonth(
                this.forcastMonth,
                `${this.name}(${this.EmpId})`
            );
        }
        console.log("forcastMonth", this.forcastMonth);
    }

    getAllEmployeeForecaseByMonth(month: string) {
        this.forecastService
            .getEmployeeAttendanceByMonth(month)
            .subscribe((res: any[]) => {
                this.attendances = res;
                console.log("getEmployeeAttendanceByMonth=>", this.attendances);
                this.prepareForcastData();
                console.log(this.attendances[0]["wfhWfoValues"]);
            });
    }

    getEmployeeForecastByMonth(month: string, name: string) {
        this.forecastService
            .getEmployeeAttendanceByMonthAndName(month, name)
            .subscribe((res: any[]) => {
                this.attendances = res;
                console.log(
                    "getEmployeeForecastByMonth res=>",
                    this.attendances
                );
                this.prepareForcastData();
                console.log(this.attendances[0]["wfhWfoValues"]);
            });
    }

    // This method is being used at template to get value from day forcast
    getValue(item: any) {
        const value = Object.values(item)[0];
        return value !== "BH" ? value : "";
    }

    // This method is being used at template to get class for styling from day forcast
    getClass(item: any) {
        const value = Object.values(item)[0];
        let className;
        if (value == "BH") {
            className = "fa-regular fa-face-smile";
        } else if (value == "O" || value == "H" || value == "L") {
            className = value;
        }
        return className;
    }

    prepareForcastData() {
        console.log("prepareForcastData");
        for (let empIndex = 0; empIndex < this.attendances.length; empIndex++) {
            this.wfhWfoValues = [];
            this.monthDates = [];
            this.MonthDays = [];
            for (
                let index = 0;
                index < this.attendances[empIndex].values.length;
                index++
            ) {
                const date = new Date(
                    Object.keys(this.attendances[empIndex].values[index])[0]
                );
                const value = Object.values(
                    this.attendances[empIndex].values[index]
                )[0];
                this.monthDates.push(date.getDate());
                this.MonthDays.push(this.weekDays[date.getDay()]);
            }
            this.monthDates.push(...["TO", "TH", "TL"]);
            this.attendances[empIndex]["values"].push(
                { TO: this.attendances[empIndex].TO },
                { TH: this.attendances[empIndex].TH },
                { TL: this.attendances[empIndex].TL }
            );
        }
    }

    getRowspan(date: string | number): number {
        return date == "TO" || date == "TH" || date == "TL" ? 2 : 1;
    }
    onChangeForcast(forcastValue: any, memberName: string, empIndex: number) {
        console.log("clicked item", forcastValue, memberName, empIndex);
        const forcastedDate = Object.keys(forcastValue)[0];
        console.log("forecast date", forcastedDate);
        const forcastedValue = Object.values(forcastValue)[0];

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const forecastDateObj = new Date(forcastedDate);
        forecastDateObj.setHours(0, 0, 0, 0);
        if (this.role === "admin" || this.role === "manager") {
            this.changeForcast(forcastedDate, forcastedValue, empIndex);
        } else if (forecastDateObj >= currentDate) {
            this.changeForcast(forcastedDate, forcastedValue, empIndex);
        }
    }
    /** */
    changeForcast(forcastedDate: any, forcastedValue: any, empIndex: number) {
        if(forcastedValue=="BH"){
                return
        }
        for (
            let index = 0;
            index < this.attendances[empIndex].values.length;
            index++
        ) {
            const forcast = Object.keys(
                this.attendances[empIndex].values[index]
            )[0];
            console.log("forcast", forcast);
            console.log(
                "valuelength",
                this.attendances[empIndex].values.length
            );
            if (forcast == forcastedDate) {
                if (forcastedValue === "O") {
                    this.attendances[empIndex].values[index][forcast] = "H";
                    this.attendances[empIndex]["TO"] =
                        this.attendances[empIndex]["TO"] - 1;
                    this.attendances[empIndex]["TH"] =
                        this.attendances[empIndex]["TH"] + 1;
                } else if (forcastedValue === "H") {
                    this.attendances[empIndex].values[index][forcast] = "L";
                    this.attendances[empIndex]["TH"] =
                        this.attendances[empIndex]["TH"] - 1;
                    this.attendances[empIndex]["TL"] =
                        this.attendances[empIndex]["TL"] + 1;
                } else if (forcastedValue === "L") {
                    this.attendances[empIndex].values[index][forcast] = "O";
                    this.attendances[empIndex]["TL"] =
                        this.attendances[empIndex]["TL"] - 1;
                    this.attendances[empIndex]["TO"] =
                        this.attendances[empIndex]["TO"] + 1;
                        
                }
                
                break;
            }
        }
        console.log(
            "this.attendances[empIndex].values",
            this.attendances[empIndex].values
        );
        //this.prepareForcastData();
        this.attendances[empIndex].values.splice(-3);

        this.forecastService
            .updateAttendence(this.attendances[empIndex])
            .subscribe((res) => {
                console.log("updated res", res);
                this.getDataAsPerUserRole();
            });
    }

    /* This method is called when user clicks on apply. This will create a new forcast if not exist for current month, otherwise will update the existing forcast*/
    onButtonClick(): void {
        
        console.log("input value", this.forcastMonth);
        const monthParts = this.forcastMonth.split("-");
        const year = monthParts[0];
        const month = monthParts[1];

        const checkedValuesOfDays = Object.keys(
            this.selectedValuesOfDays
        ).filter((option) => this.selectedValuesOfDays[option]);
        const val = this.getValues(+year, +month, checkedValuesOfDays);
        console.log("data to save", val);

        // Check if the data already exists for the selected month and name
        this.forecastService
            .getEmployeeAttendanceByMonthAndName(month, val.name)
            .subscribe((attendances) => {
                if (attendances && attendances.length > 0) {
                    // Data already exists, find the record to update based on the ID
                    const matchingRecord = attendances.find((record: any) => {
                        // Compare relevant fields here to identify a match
                        // Example: return record.name === val.name && record.values === val.values;
                    });

                    if (matchingRecord) {
                        // Update the existing record
                        this.forecastService
                            .updateAttendence(val)
                            .subscribe((res) => {
                                console.log("update response", res);
                                this.getDataAsPerUserRole();
                            });
                    }
                } else {
                    // Data doesn't exist, create a new entry
                    this.forecastService
                        .postAttendence(val)
                        .subscribe((res) => {
                            console.log("create response", res);
                            this.getDataAsPerUserRole();
                        });
                }
            });
    }

    // This method is preparing data so save into database
    getValues(year: number, month: number, checkedValuesOfDays: string[]) {
        const totalDays = new Date(year, month, 0).getDate();
        const values = [];
        let TO = 0;
        let TH = 0;
        let TL = 0;

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month - 1, day);
            const formattedDate = new Date(year, month - 1, day + 1)
                .toISOString()
                .slice(0, 10);
            if (date.getDay() == 6 || date.getDay() == 0) {
                //Sat, Sun
                values.push({ [formattedDate]: "BH" });
            } else if (
                checkedValuesOfDays.indexOf(this.weekDays[date.getDay()]) > -1
            ) {
                values.push({ [formattedDate]: "O" });
                TO++;
            } else {
                values.push({ [formattedDate]: "H" });
                TH++;
            }
        }
        return {
            month: `${year}-${month.toString().padStart(2, "0")}`,
            name: `${this.name}(${this.EmpId})`,
            values,
            TO,
            TH,
            TL,
        };
    }

   
   
}
