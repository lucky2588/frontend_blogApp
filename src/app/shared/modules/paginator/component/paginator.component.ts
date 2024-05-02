import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageSizes, PaginatorState } from 'src/app/shared/models/table';



@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() paginator!: PaginatorState;
  @Input() isLoading = false;
  @Output() paginate: EventEmitter<PaginatorState> = new EventEmitter();
  pageSizes: number[] = PageSizes;
  constructor() { }



  ngOnInit(): void {
    console.log(this.paginator)
  }





  pageChange(event: PageEvent) {
    this.paginator = { ...this.paginator, page: event.pageIndex, pageSize: event.pageSize }
    this.paginate.emit(this.paginator);
  }

  sizeChange() {
    this.paginate.emit(this.paginator);
  }





}
