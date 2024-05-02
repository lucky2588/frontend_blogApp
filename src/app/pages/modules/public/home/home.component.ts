import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap
} from 'rxjs';

import { CategoryItem } from 'src/app/pages/models/public';

import { ITableState, PaginatorState, SortState } from 'src/app/shared/models/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogPublicService } from '../service/blog-public.service';
import { CategoryService } from '../../admin/manage-category/service/category.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit,OnDestroy{


  // Initialization

 sortList = [
  {
   value : 'created_date',
   labelName : 'Create Date'
  },
  {
    value: 'view',
    labelName : ' View '
   }
]

  categories: CategoryItem[];
  sorting: SortState;
  paginator: Observable<PaginatorState> = this.service.paginator$;
  DEFAULT_STATE: ITableState = {
    paginator: new PaginatorState(),
    textSearch: '',
    categories: '',
    sorting : new SortState(),
  };
  filterGroup!: FormGroup;

  constructor(
    public service: BlogPublicService,
    private fb: FormBuilder,
    private categorySerivce: CategoryService,
    private router : Router,
  ) {
    this.DEFAULT_STATE = this.service.DEFAULT_STATE;
    this.sorting = this.DEFAULT_STATE.sorting;
    this.categories = [];
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.service.patchState(this.DEFAULT_STATE);
    this.categorySerivce.getAll().subscribe((next: any) => {
      this.categories = next;
    });
  }

  ngAfterViewInit(): void {
    this.filterGroup!.valueChanges.pipe(  //ref Youtube :  https://www.youtube.com/watch?v=tO-WP-DX_jw
      debounceTime(300), // delay 300ms before call api action user
      distinctUntilChanged(), // check in time change action
      switchMap((value: { search: string; categories: number[] , sort : string }) => {
        console.log(value.sort)
        this.DEFAULT_STATE.textSearch = value.search,
        this.DEFAULT_STATE.categories = value.categories? '' + value.categories.join(',') : ''
        this.DEFAULT_STATE.sorting.column = value.sort? value.sort : 'created_date'
        this.resetPanator();
        this.service.patchState(this.DEFAULT_STATE);
        return this.service.items$;
      })).subscribe();
  }

  initFilterForm() { // for Filter
    this.filterGroup = this.fb.group({
      categories: [],
      search: '',
      sort : '',
    });
  }

  paginate(value: PaginatorState) { // set value for page / pageSize
    this.DEFAULT_STATE.paginator.page = value.page,
    this.DEFAULT_STATE.paginator.pageSize = value.pageSize,
    this.service.patchState(this.DEFAULT_STATE);
  }

  resetPanator(){
    this.DEFAULT_STATE.paginator.page = 0;
  }


  view(id:number){
    this.router.navigate([`/blog/${id}`]);
  }



  ngOnDestroy(): void {
    this.DEFAULT_STATE.paginator.pageSize = 10;
    this.DEFAULT_STATE = this.service.resetState();
    // this.service.cancelSub();
  }
}


