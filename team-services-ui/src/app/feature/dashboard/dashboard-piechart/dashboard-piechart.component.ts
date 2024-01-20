import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as echarts from "echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import { NgxEchartsModule } from "ngx-echarts/public-api";
import { RestapiService } from "src/app/service/restapi.service";
@Component({
    selector: "app-dashboard-piechart",
    templateUrl: "./dashboard-piechart.component.html",
    styleUrls: ["./dashboard-piechart.component.css"],
})
export class DashboardPiechartComponent implements AfterViewInit {
    constructor(private service: RestapiService) {}
    res: any[] = [];
    skillDistribution: { skill: string; count: number }[] = [];

    ngAfterViewInit(): void {
        this.service.getEmployee().subscribe((res: any[]) => {
            console.log("res", res);
            this.res = res;
            this.calculateSkillDistribution();
            this.initSkillDistributionChart();
        });
    }

    calculateSkillDistribution(): void {
        // Calculate the distribution of skills among employees
        const skillCountMap = new Map<string, number>();

        this.res.forEach((employee: any) => {
            const skillsArray = employee.Skills.split(","); // Split the skill string into an array

            skillsArray.forEach((skill: string) => {
                const trimmedSkill = skill.trim(); // Remove leading/trailing spaces

                if (trimmedSkill !== "") {
                    const currentCount = skillCountMap.get(trimmedSkill) || 0; // Use 0 as default if skill count is undefined
                    skillCountMap.set(trimmedSkill, currentCount + 1);
                }
            });
        });

        this.skillDistribution = Array.from(skillCountMap.entries()).map(
            ([skill, count]) => ({ skill, count })
        );
    }

    initSkillDistributionChart(): void {
        const skillChart = echarts.init(document.getElementById("pie-chart"));
        const option = {
            title: {
                text: "Team Competency",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
                orient: "vertical", // You can also use 'horizontal'
                left: "left", // Adjust the position as needed
                data: this.skillDistribution.map((entry) => entry.skill),
            },
            series: [
                {
                    name: "Skills",
                    type: "pie",
                    radius: "50%",
                    data: this.skillDistribution.map((entry) => ({
                        value: entry.count,
                        name: entry.skill,
                    })),
                    label: {
                        show: true, // Show labels on each slice
                        formatter: "{b}: {c} ({d}%)",
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };

        skillChart.setOption(option);
    }
}
