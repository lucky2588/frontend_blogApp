import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SortIconComponent } from './component/sort-icon.component';
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [SortIconComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    InlineSVGModule
  ],
  exports:[
    SortIconComponent
  ]

})
export class SortModule { }
