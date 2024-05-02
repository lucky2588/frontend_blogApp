import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  MatCardModule,
  MatCardHeader,
  MatCardContent,
  MatCardActions,
  MatCardTitle,
  MatCardSubtitle,
} from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule, // Thêm MatProgressSpinnerModule vào imports
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule, // Cũng cần thêm MatProgressSpinnerModule vào exports nếu bạn muốn sử dụng ở nơi khác
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class AppMaterialModule { }
