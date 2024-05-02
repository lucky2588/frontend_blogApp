import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [ // phân bổ Route Child
  {
    path: '',
    component: AuthComponent,
    children: [
      { // log url prefix Auth --> /login
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: RestPasswordComponent,
      },
      {
        path: 'registration',
        component: RegisterComponent
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)], // Route Lazy
  exports: [RouterModule]
})
export class AuthRoutingModule {}
