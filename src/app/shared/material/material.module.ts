import { NgModule } from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatDialogModule} from "@angular/material/dialog"
import {MatSelectModule} from "@angular/material/select"
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatNativeDateModule } from "@angular/material/core";
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSliderModule } from '@angular/material/slider';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

const material = [
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatButtonModule,
  MatTableModule,MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatSliderModule,
  NgbProgressbarModule
]
@NgModule({
  imports:[
    material
  ],
    exports: [
      material
    ]
})

export class MaterialModule { }
