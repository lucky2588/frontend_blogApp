import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './component/paginator.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    MatPaginatorModule
  ],exports:[
    PaginatorComponent
  ]
})
export class PanginatorModule { }
