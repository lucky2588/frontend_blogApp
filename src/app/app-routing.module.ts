import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './pages/modules/public/home/home.component';
import { NgModule, Component } from '@angular/core';
import { GuardsCheckEnd, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/modules/not-found/not-found.component';
import { BlogDetailComponent } from './pages/modules/public/blogDetail/blog-detail.component';
import { AuthService, guardPremissonAdmin } from './auth/serivce/auth.service';
import { AuthorizeService } from './auth/serivce/authorize.service';
import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path: 'home' , component : HomeComponent , pathMatch : 'prefix'},
  {path: '' , component : HomeComponent , pathMatch : 'prefix'},
  {path: 'auth' , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'blog/:blogID' , component : BlogDetailComponent , pathMatch : 'full'},
  {path: '' , loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  {path: 'Authorize' , component : AuthorizeComponent},
  {path: '**' , component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
