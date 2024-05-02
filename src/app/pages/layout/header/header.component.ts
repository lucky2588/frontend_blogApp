import { AuthService, setData } from './../../../auth/serivce/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  DoCheck,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { getData } from 'src/app/auth/serivce/auth.service';
import { UserInfo } from '../../modules/user/models/userInfo';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Observable, Subscription } from 'rxjs';
import { AuthInfo } from 'src/app/auth/models/authModels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  private loginSuccessSubscription!: Subscription; // bắt sự kiện
  isShow = false; // show side bar ...
  @Output() isHide = new EventEmitter<boolean>()
  // variable inside class=
  authInfo: AuthInfo = {
    id :0,
    username: '',
    avatar: '',
    name: '',
    email: '',
    roles: [],
    isAuthenticated: false,
    token: '',
  };

  isAuthentic: boolean = false;
  isAuthorize: string[] = [];
  permissonList: string[] = [];



  // initialization
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (getData('isAuthenticated') == true) {
      // using for native Params form user defition native url
      this.authInfo = this.authService.getUserInfo(); // get User Info now
    } else {
      this.authInfo = this.authService.setUserInfoDefalut(); // turn on Application
    }
  }

  ngDoCheck(): void {
    // save or Change Info base on User Action Log in / Log Out
    this.permissonList = getData('roles').map((item: any) => item.roleName)
      ? getData('roles').map((item: any) => item.roleName)
      : [];
    this.loginSuccessSubscription = this.authService.currentUserInfo$.subscribe(
      (data) => (this.authInfo = data)
    );
  }


  showSideBar(){
      this.isShow = !this.isShow
      this.isHide.emit(this.isShow)
  }

  // handlen Service
  checkRoles(permisson:any[]){ // check Role
    return permisson.every(item => this.authInfo.roles.includes(item))
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  ngOnDestroy(): void {
    // cancel event / remove cache
    this.loginSuccessSubscription.unsubscribe();
  }
}
