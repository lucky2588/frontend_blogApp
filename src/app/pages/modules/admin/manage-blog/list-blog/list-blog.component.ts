import {
  Component,
  OnInit,
  AfterViewInit,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { CategoryItem } from 'src/app/pages/models/public';
import { BlogService } from '../service/blog.service';
import { CategoryService } from '../../manage-category/service/category.service';
import { ITableState, PaginatorState, SortState } from 'src/app/shared/models/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewBlogComponent } from '../view-blog/view-blog.component';
import { DeleteBlogComponent } from '../delete-blog/delete-blog.component';
import { CreateOrUpdateBlogComponent } from '../create-or-update-blog/create-or-update-blog.component';


@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss'],
})
export class ListBlogComponent implements OnInit, AfterViewInit,OnDestroy {
  id: any;
  private shareData!: Observable<any>; // bắt sự kiện
  categories: CategoryItem[];

  sorting: SortState;
  paginator: Observable<PaginatorState> = this.service.paginator$;

  DEFAULT_STATE: ITableState = {
    paginator: new PaginatorState(),
    textSearch: '',
    categories: '',
    sorting : new SortState(),
  };

  // Initialization
  updateForm!: FormGroup;
  filterGroup!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(
    public service: BlogService,
    private fb: FormBuilder,
    private categorySerivce: CategoryService,
    private modalService : NgbModal,
  ) {
    this.DEFAULT_STATE = this.service.DEFAULT_STATE;
    this.sorting = this.DEFAULT_STATE.sorting;
    this.categories = [];

  }


  ngOnInit(): void {
    this.initForm();
    this.service.patchState(this.DEFAULT_STATE);
    this.categorySerivce.getAll().subscribe((next: any) => {
      this.categories = next;
    });
  }

  ngAfterViewInit(): void {
    this.filterGroup!.valueChanges.pipe(  //ref Youtube :  https://www.youtube.com/watch?v=tO-WP-DX_jw
      debounceTime(300), // delay 300ms before call api action user
      distinctUntilChanged(), // check in time change action
      switchMap((value: { search: string; categories: number[] }) => {
        this.DEFAULT_STATE.textSearch = value.search,
        this.DEFAULT_STATE.categories = value.categories? '' + value.categories.join(',') : ''
        this.resetPanator();
        this.service.patchState(this.DEFAULT_STATE);
        return this.service.items$;
      })).subscribe();
  }

  initForm() { // for Filter
    this.filterGroup = this.fb.group({
      categories: [],
      search: '',
    });
  }


// handlen event --> binding to pros of State
  paginate(value: PaginatorState) { // set value for page / pageSize
    this.DEFAULT_STATE.paginator.page = value.page,
    this.DEFAULT_STATE.paginator.pageSize = value.pageSize,
    this.service.patchState(this.DEFAULT_STATE);
  }


  resetPanator(){
    this.DEFAULT_STATE.paginator.page = 0;
  }
  sort(column: string) {
    const sorting = this.DEFAULT_STATE.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.DEFAULT_STATE.sorting = sorting;
    this.service.patchState(this.DEFAULT_STATE);
  }



  // service for CRUD
  view(id: number) {
    const modalRef = this.modalService.open(ViewBlogComponent, { size: 'xl', scrollable: true , backdrop : false });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.service.patchState(this.DEFAULT_STATE),
      () => { }
    );
   }

   create() {
    const modalRef = this.modalService.open(CreateOrUpdateBlogComponent, { size: 'xl', scrollable: true , backdrop : false });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(() =>
      this.service.patchState(this.DEFAULT_STATE),
      () => { // render again categories
        this.categorySerivce.getAll().subscribe((next: any) => {
          this.categories = next;
        });
      }
    );
   }

   update(id: number) {
    const modalRef = this.modalService.open(CreateOrUpdateBlogComponent, { size: 'xl', scrollable: true , backdrop : false });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.service.patchState(this.DEFAULT_STATE),
      () => { // render again categories
        this.categorySerivce.getAll().subscribe((next: any) => {
          this.categories = next;
        });
      }
    );
   }

   delete(id: number,title:string) {
    const modalRef = this.modalService.open(DeleteBlogComponent,  { centered:true, scrollable: true , backdrop : false });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = title;
    modalRef.result.then(() =>
      this.service.patchState(this.DEFAULT_STATE),
      () => { }
    );
  }



  ngOnDestroy(): void {
  //  this.service.cancelSub(); // cancel Cache
   this.DEFAULT_STATE = this.service.resetState();
  }





}





