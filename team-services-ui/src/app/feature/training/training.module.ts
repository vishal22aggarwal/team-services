import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TrainingComponent } from "./training.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Dialog } from "@angular/cdk/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddTrainingComponent } from './add-training/add-training.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';


const routes: Routes = [
    {
     path: "", 
     component: TrainingComponent 
    }
    ];
@NgModule({
    declarations: [TrainingComponent, AddTrainingComponent],
    imports: [CommonModule,MatSortModule,MatTableModule,MatFormFieldModule,MatDialogModule,MatPaginatorModule,MatInputModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatSelectModule,MatDatepickerModule,MatTooltipModule,MatNativeDateModule, ClipboardModule,
        RouterModule.forChild(routes)], 
})
export class TrainingModule {}
