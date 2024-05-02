export interface ITableState {

  paginator: PaginatorState;
  sorting: SortState;
  textSearch: string;
  categories: string;
}

export const PageSizes = [10, 20, 50];

export interface IPaginatorState {
  page: number; // trang hiện tại
  pageSize: number; // tổng số Element trên 1 trang
  totalElement: number; // tổng Element tonàn bộ

  // recalculatePaginator(total: number): IPaginatorState;
}

export class PaginatorState implements IPaginatorState {
  page = 0; // index now
  pageSize = 10;
  totalElement = 0;
  totalPages =  Math.ceil(this.totalElement / this.pageSize) ; // total Pages
  // pageSizes: number[] = [];

  // recalculatePaginator(total: number): PaginatorState {
  //   this.totalElement = total;
  //   return this;
  // }
}

export type SortDirection = 'asc' | 'desc' | '';

export interface ISortState {
  column: string;
  direction: SortDirection;
}

export class SortState implements ISortState {
  column = 'created_date'; // value fied by default
  direction: SortDirection = 'desc'; // desc by default;
}

