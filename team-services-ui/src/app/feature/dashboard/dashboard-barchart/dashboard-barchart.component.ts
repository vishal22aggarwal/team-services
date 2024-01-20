import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as echarts from "echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import { NgxEchartsModule } from "ngx-echarts/public-api";
import { RestapiService } from "src/app/service/restapi.service";
@Component({
    selector: "app-dashboard-barchart",
    templateUrl: "./dashboard-barchart.component.html",
    styleUrls: ["./dashboard-barchart.component.css"],
})
export class DashboardBarchartComponent implements AfterViewInit {
    constructor(private service: RestapiService) {}
    res: any[] = [];
    gradeDistribution: { grade: string; count: number }[] = [];
    ngAfterViewInit(): void {
        this.service.getEmployee().subscribe((res: any[]) => {
            this.res = res;
            this.calculateGradeDistribution(); // Call the new grade distribution function
            this.initGradeDistributionChart(); // Call the new bar chart creation function
        });
    }
    calculateGradeDistribution(): void {
        const gradeCountMap = new Map<string, number>();

        this.res.forEach((employee: any) => {
            const grade = employee.Grade;

            const currentCount = gradeCountMap.get(grade) || 0;
            gradeCountMap.set(grade, currentCount + 1);
        });

        this.gradeDistribution = Array.from(gradeCountMap.entries()).map(
            ([grade, count]) => ({ grade, count })
        );
    }
    initGradeDistributionChart(): void {
        const barChart = echarts.init(document.getElementById("bar-chart"));
        const option = {
            title: {
                text: "Team Members by Grade",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow", // Show shadow on bars
                },
            },
            xAxis: {
                type: "category",
                data: this.gradeDistribution.map((entry) => entry.grade), // X-axis labels
                axisLabel: {
                    rotate: 0, // Rotate labels for better visibility
                    interval: 0, // Show all labels
                },
                name: "Grade",
            },
            yAxis: {
                type: "value",
                name: "Count",
                interval: 1,
            },
            series: [
                {
                    name: "Employees",
                    type: "bar",
                    data: this.gradeDistribution.map((entry) => entry.count),
                },
            ],
        };

        barChart.setOption(option);
    }
}
