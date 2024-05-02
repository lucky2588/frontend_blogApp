import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoComponent } from './modules/user/user-info/user-info.component';
import { BlogDetailComponent } from './modules/public/blogDetail/blog-detail.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { CommentsComponent } from './modules/public/comments/comments.component';
import { ManageBlogComponent } from './modules/admin/manage-blog/manage-blog.component';
import { ReportBlogComponent } from './modules/admin/manage-blog/report-blog/report-blog.component';
import { ViewBlogComponent } from './modules/admin/manage-blog/view-blog/view-blog.component';
import { ListBlogComponent } from './modules/admin/manage-blog/list-blog/list-blog.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '../auth/auth.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HasPermissionDirective } from '../shared/directive/has-permission.directive';
import { ValidatesModule } from '../shared/modules/validation/validates.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModal, NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrUpdateBlogComponent } from './modules/admin/manage-blog/create-or-update-blog/create-or-update-blog.component';
import { DeleteBlogComponent } from './modules/admin/manage-blog/delete-blog/delete-blog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriesComponent } from './modules/admin/manage-category/categories.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { PanginatorModule } from '../shared/modules/paginator/panginator.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateCategoryComponent } from './modules/admin/manage-category/create-category/create-category.component';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { SortIconComponent } from '../shared/modules/sort-icon';
import { SortModule } from '../shared/modules/sort-icon/sort.module';






@NgModule({
  declarations: [
// for Public / Global
    BlogDetailComponent,
    CommentsComponent,
    // for User
    UserInfoComponent,
  // for Admin Manager
       // for Blog
    ManageBlogComponent,
    ReportBlogComponent,
    ViewBlogComponent,
    ListBlogComponent,
    CreateOrUpdateBlogComponent,
    DeleteBlogComponent,
    CategoriesComponent,
    CreateCategoryComponent,
  ],
  imports: [
    /// module defualt + custome
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    AuthModule,
    ValidatesModule,
    PanginatorModule,
    SortModule,
    ReactiveFormsModule,

    // for Libaries
    MatTooltipModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    NgbModalModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(), // ==> refDocs : https://valor-software.com/ngx-bootstrap/#/documentation
    CarouselModule.forRoot()
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class PagesModule {}
