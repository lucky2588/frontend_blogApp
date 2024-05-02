import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './modules/user/user-info/user-info.component';
import { ManageBlogComponent } from './modules/admin/manage-blog/manage-blog.component';
import { ViewBlogComponent } from './modules/admin/manage-blog/view-blog/view-blog.component';
import { ReportBlogComponent } from './modules/admin/manage-blog/report-blog/report-blog.component';
import { HomeComponent } from './modules/public/home/home.component';
import { BlogDetailComponent } from './modules/public/blogDetail/blog-detail.component';
import { AuthService } from '../auth/serivce/auth.service';
import { AuthorizeService } from '../auth/serivce/authorize.service';
import { ListBlogComponent } from './modules/admin/manage-blog/list-blog/list-blog.component';
import { CreateOrUpdateBlogComponent } from './modules/admin/manage-blog/create-or-update-blog/create-or-update-blog.component';


const routes: Routes = [
  // defition Routing Of User
  // Setting the page title --> RefDoc : https://angular.io/guide/router
  {
    path: 'getInfo',
    component: UserInfoComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        redirectTo: 'getInfo',
        pathMatch: 'full'
      }
    ]
  },
// defition Routing Of Blog
  {
    path: 'manage',
    component: ManageBlogComponent,
    canActivate: [AuthorizeService],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'blog',
      //   pathMatch: 'full'
      // }
      {
        path: 'blog',
        component: ListBlogComponent,
      },
      {
        path: 'blog/craete',
        component: CreateOrUpdateBlogComponent,
      },
      {
        path: 'blog/:blogID',
        component: CreateOrUpdateBlogComponent,
      },
      {
        path: 'blog/view/:blogID',
        component: ViewBlogComponent,
      },
      {
        path: 'blog/report',
        component: ReportBlogComponent,
      },
    ]
  },
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
