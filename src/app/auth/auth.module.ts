import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { QuillModule } from 'ngx-quill';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ValidatesModule } from '../shared/modules/validation/validates.module';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HasPermissionDirective } from '../shared/directive/has-permission.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WarningComponent } from './warning/warning.component';


// list Componet + Module Auth --> Login + Authentication + Authozire + Resgiter
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RestPasswordComponent,
    WarningComponent,
  ],
  imports: [
    AuthRoutingModule, //import Routing,
    ValidatesModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    QuillModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(), // ==> refDocs : https://valor-software.com/ngx-bootstrap/#/documentation
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class AuthModule {}
