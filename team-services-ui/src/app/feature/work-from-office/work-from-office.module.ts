import { RouterModule, Routes } from "@angular/router";
import { WorkFromOfficeComponent } from "./work-from-office.component";
import { CommonModule } from "@angular/common";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatNativeDateModule } from "@angular/material/core";
import { NgModelGroup} from "@angular/forms";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
const routes: Routes = [
    {
     path: "", 
     component: WorkFromOfficeComponent
    }
    ];
@NgModule({
    declarations: [WorkFromOfficeComponent],
    imports: [CommonModule,MatSortModule,MatTableModule,MatFormFieldModule,MatDialogModule,MatPaginatorModule,MatInputModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatSelectModule,MatDatepickerModule,MatTooltipModule,MatNativeDateModule,FormsModule,
        RouterModule.forChild(routes)],
})
export class WorkFromOfficeModule {}