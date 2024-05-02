import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from './service/category.service';
import { GroupingState } from 'src/app/shared/models/grouping.model';
import { map } from 'rxjs/operators';
import { CategoryItem } from 'src/app/pages/models/public';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit , DoCheck{
  // send Child / Parent
  @Input() listCategory: number[] = [];
  @Input() showCategoris: number = 0;
  isCheckEmpty: boolean = false;
  @Input() disableCategory : boolean = true;
  @Output() sendCategories =  new EventEmitter<number[]>()




  Ids : number[] = []; // list All ID

  categories: any;
  grouping: GroupingState = new GroupingState();

  constructor(public service: CategoryService,
    public modalService : NgbModal,
    public modal: NgbActiveModal,

  ) {}



  ngDoCheck(): void {
    this.showCategoris = this.listCategory.length;
    this.sendCategories.emit(this.listCategory)
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (value) => (
        this.categories = value,
        this.Ids = this.categories.map((e:any)=>e.id),
        this.grouping.itemIds = this.Ids
      ),
      complete: () => this.loadData(this.categories),
    });
    this.grouping.selectedRowIds = new Set<number>(this.listCategory);

    this.service.fetch();

  }

  loadData(categories: any) {
    this.categories = categories;
  }

  checkSeletedAll() {
    const arrs = this.categories.map((e:any)=>e.id)
    if (this.grouping.getSelectedRows().length === 0) {
      this.listCategory = [];
      this.isCheckEmpty = true;
    } else {
      this.isCheckEmpty = false;
      arrs.forEach((a:number) => {
        if (!this.listCategory.includes(a)) {
          this.listCategory.push(a);
        }
      });
    }
  }

  checkSelectd(id: number) {
    if (!this.listCategory.includes(id)) {
      this.listCategory.push(id);
      this.isCheckEmpty = false;
    } else {
      this.listCategory = this.listCategory.filter((e) => e != id);
      if (this.listCategory.length < 1) {
        this.isCheckEmpty = true;
      }
    }
  }



  create() {
    const modalRef = this.modalService.open(CreateCategoryComponent, { size: 'lg', scrollable: true , backdrop : false , centered : true});
    modalRef.componentInstance.id = 0;
    modalRef.result.then(() => {
      this.service.getAll().subscribe({
        next: (value) => (
          this.service.fetch(),
          this.categories = value,
          this.Ids = this.categories.map((e:any)=>e.id),
          this.grouping.itemIds = this.Ids
        ),
        complete: () => this.loadData(this.categories),
      });
      this.grouping.selectedRowIds = new Set<number>(this.listCategory);
    } ,
     () => { }
    );
   }
}
