import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandlenApiService } from './service/handlen-api.service';
import { LabelStatusComponent } from './modules/label-status/label-status.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [LabelStatusComponent, TruncatePipe],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    NgbPaginationModule
  ],
  exports: [
    NgbPaginationModule,
    LabelStatusComponent,
    NgxPaginationModule,
    CommonModule,
    NgbModalModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [HandlenApiService,TruncatePipe],
})
export class SharedModule {}
