import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './shared/modules/not-found/not-found.component';;
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { HomeComponent } from './pages/modules/public/home/home.component';;
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ValidatesModule } from './shared/modules/validation/validates.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppMaterialModule } from './shared/libs/app-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { HasPermissionDirective } from './shared/directive/has-permission.directive';
import { SharedModule } from './shared/shared.module';
import { LabelStatusComponent } from './shared/modules/label-status/label-status.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { PanginatorModule } from './shared/modules/paginator/panginator.module';


@NgModule({
  declarations: [
    AppComponent,
    // Of Home
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    // Of Auth
    AuthorizeComponent,
    NotFoundComponent,
    //Of Custom
    HasPermissionDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  // Of Modules + Component + Routing
          // for Authentication
    AuthModule,
    PanginatorModule,
         // for Pages All
    PagesModule,
    SharedModule,
        // for Customer
    ValidatesModule,
  // Of Liberies
    NgxPaginationModule,
    PaginationModule.forRoot(),
    AppMaterialModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),  // ==> RefDocs :  https://www.npmjs.com/package/ngx-quill/v/23.0.0
    BsDatepickerModule.forRoot(), // --> RefDocs : https://valor-software.com/ngx-bootstrap/#/components/datepicker?tab=api,
    TooltipModule.forRoot(), // ==> refDocs : https://valor-software.com/ngx-bootstrap/#/documentation
    CarouselModule.forRoot(),
    FontAwesomeModule,
    //for Material
    //for MDB Bootstrap
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
  ],
  providers: [
    TruncatePipe ,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
