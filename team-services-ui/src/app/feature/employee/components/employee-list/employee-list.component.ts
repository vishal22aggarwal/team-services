import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    OnDestroy,
} from "@angular/core";
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from "@angular/material/table";
import { AppConstants } from "src/app/core/config/app-constants";
import { DataService } from "src/app/core/services";
import { RestapiService } from "src/app/service/restapi.service";
import { Subscription } from "rxjs";
@Component({
    selector: "app-employee-list",
    templateUrl: "./employee-list.component.html",
    styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnDestroy {
    constructor(
        private service: RestapiService,
        private dataService: DataService
    ) {}
    employeesList: any[] = [];
    employeeListData = new MatTableDataSource<any, MatTableDataSourcePaginator>(
        this.employeesList
    );
    private subscription: Subscription;
    ngOnInit(): void {
        console.log("emp list ngonit");
        this.fetchEmployees();
        this.subscription = this.dataService
            .getSharedData()
            .subscribe((res) => {
                if (res === AppConstants.DATA_SAVED) {
                    this.fetchEmployees();
                }
            });
    }

    fetchEmployees() {
        this.service.getEmployee().subscribe((res: any[]) => {
            console.log("res", res);
            this.employeesList = res;
            this.employeeListData.data = res;
            this.employeeListData = new MatTableDataSource<
                any,
                MatTableDataSourcePaginator
            >(this.employeesList);
        });
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
