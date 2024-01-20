import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarCmpComponent } from "./components/navbar-cmp/navbar-cmp.component";
import { CoreComponent } from "./core.component";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuTrigger } from "@angular/material/menu";

import { Route } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { ListComponent } from "./components/list/list.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CoreRoutingModule } from "./core-routing.module";
import { TableAddPopupComponent } from "./components/table-add-popup/table-add-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatLabel } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { RestapiService } from "../service/restapi.service";
import { ExcelUploadService } from "./services";
import { MatTooltipModule } from "@angular/material/tooltip";
@NgModule({
    declarations: [
        NavbarCmpComponent,
        ListComponent,
        CoreComponent,
        TableAddPopupComponent,
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,

        CoreRoutingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTooltipModule,
    ],
    exports: [NavbarCmpComponent, ListComponent],
    providers: [ExcelUploadService],
})
export class CoreModule {}
