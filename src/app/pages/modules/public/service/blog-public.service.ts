
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import { environment } from 'src/environments/environment';
import { ITableState, PaginatorState, SortState } from 'src/app/shared/models/table';
import { query } from '@angular/animations';
import { iTableBlog } from '../../admin/models/blog';


const BASE_URL = environment.URL + 'api/public/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogPublicService {
  // get HttpInterceptorFn ==> refDoc : https://angular.io/api/common/http/HttpInterceptorFn
  HttpInterceptorFn: any
  queryTotal: string = ''

  DEFAULT_STATE: ITableState = {
    paginator: new PaginatorState(),
    textSearch: '',
    categories: '',
    sorting: new SortState(),

  };


  private _items$ = new BehaviorSubject<any[]>([]);
  private _paginatorState$ = new BehaviorSubject<PaginatorState>(this.DEFAULT_STATE.paginator);

  get paginator$() {
    return this._paginatorState$.asObservable();
  }
  get items$() {
    return this._items$.asObservable();
  }



  constructor(private router: Router, private http: HttpClient,
    private authService: AuthService,
    private serviceAPI: HandlenApiService,
  ) {
    this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
  }




  reTurnToken() { // --> get Token when User other login
    this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
  }


  patchState(fetch: ITableState) { // save State when Filter
    console.log(fetch.categories)
    this.DEFAULT_STATE.textSearch = fetch.textSearch
    this.DEFAULT_STATE.categories = fetch.categories
    this.DEFAULT_STATE.paginator.page = fetch.paginator.page;
    this.DEFAULT_STATE.paginator.pageSize = fetch.paginator.pageSize;
    this.getQuery()
    this.fetchData()
  }


  getQuery() {
    this.queryTotal = `?page=${this.DEFAULT_STATE.paginator.page}&pageSize=${this.DEFAULT_STATE.paginator.pageSize}&sortProperty=${this.DEFAULT_STATE.sorting.column}&sortOrder=${this.DEFAULT_STATE.sorting.direction}&textSearch=${this.DEFAULT_STATE.textSearch}&categories=${this.DEFAULT_STATE.categories}`
  }

  getAll() {
    return this.http.get(BASE_URL);
  }


  fetchData() {
    this.http.get<iTableBlog>(BASE_URL + '' + this.queryTotal).pipe(
      tap((value: any) => {
        this._items$.next(value.data)
        let paginatorTemple: PaginatorState = {
          page: value.pageCurrent,
          totalElement: value.totalElements,
          pageSize: this.DEFAULT_STATE.paginator.pageSize,
          totalPages: value.totalPages
        }
        this._paginatorState$.next(paginatorTemple)
      })
    ).subscribe();
  }



  cancelSub() {
    this._items$.unsubscribe();
    this._paginatorState$.unsubscribe();
  }

  resetState() {
    const RESET_STATE: ITableState = {
      paginator: new PaginatorState(),
      textSearch: '',
      categories: '',
      sorting: new SortState(),
    };
    this.DEFAULT_STATE = RESET_STATE;
    return RESET_STATE;
  }





  getDetail(id: number) {
    return this.http.get(BASE_URL + '/' + id,);
  }




  getCategoris() {
    return this.http.get(environment.URL + 'api/manage/category/getAll', this.HttpInterceptorFn);
  }




}
