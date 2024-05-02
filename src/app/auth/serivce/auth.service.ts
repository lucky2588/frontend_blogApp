
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from 'src/app/pages/modules/user/models/userInfo';
import { AuthInfo, LoginRequest, RegisterRequest } from '../models/authModels';
import { CanActivateFn } from '@angular/router';

const BASE_URL = environment.URL + 'authentication';
export const setData = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
// Lấy dữ liệu từ trong localStorage
export const getData = (key: string) => {
  const localStorageValue = localStorage.getItem(key);
  if (localStorageValue) {
    return JSON.parse(localStorageValue);
  }
  return null;
};

export let guardPremissonAdmin: CanActivateFn = (route, state) => {
  const permissionAllow = ['ADMIN', 'USER'];
  const listRole = getData('roles').map((item: any) => item.roleName);
  const isAllow = permissionAllow.every((permission) =>
    listRole.includes(permission)
  );
  if (isAllow) {
    return true;
  } else {
    return false;
  }
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  authInfo: AuthInfo = {
    id: 0,
    username: '',
    avatar: '',
    name: '',
    email: '',
    roles: [],
    isAuthenticated: false,
    token: '',
  };

  // initialization
  // choose this service make intermediate processing center for Header Component and Login Component
  private currentUserInfoSubject = new Subject<any>(); // sub one subject ==> refDoc : https://rxjs.dev/guide/subject
  currentUserInfo$ = this.currentUserInfoSubject.asObservable(); // Current Info User Now

  constructor(private router: Router, private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(BASE_URL + '/login', loginRequest);
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<RegisterRequest>(BASE_URL + '/register', registerRequest);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (getData('isAuthenticated')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // getAuthenticator():boolean{
  //    return this.authInfo.isAuthenticated;
  // }

  // get Info User
  getAuthorize() {
    return this.authInfo.roles;
  }
  getRoles() {
    return this.authInfo.roles;
  }
  getAuthentication() {
    return getData('isAuthenticated') ? getData('isAuthenticated') : false;
  }
  setUserInfoDefalut() {
    // set Defualt
    setData('id', '');
    setData('username', '');
    setData('name', '');
    setData('token', null);
    setData('roles', []);
    setData('avatar', '');
    setData('isAuthenticated', false);
    return this.authInfo = {
      id: 0,
      username: '',
      isAuthenticated: false,
      avatar: '',
      roles: [],
      name: '',
      email: '',
      token: '',
    };
  }
  getUserInfo() {
    return this.authInfo = {
      id: getData('id'),
      username: getData('username'),
      isAuthenticated: getData('isAuthenticated'),
      avatar: getData('avatar'),
      roles: getData('roles'),
      name: getData('name'),
      email: getData('email'),
      token: getData('token')
    };
  }
  getToken() {
    return this.authInfo.token;
  }

  // Data Transmission --> using Subject
  saveUserInfo(user: any) {
    this.currentUserInfoSubject.next(user);
  }





  //save Local Storage
  saveInfo(response: any) {
    const authInfo = response;
    setData('id', authInfo.auth.id);
    setData('username', authInfo.auth.username);
    setData('name', authInfo.auth.name);
    setData('token', response.token);
    setData('avatar', authInfo.auth.avatar);
    setData('isAuthenticated', authInfo.isAuthenticated);
    const listRole = response.auth.roles.map((item: any) => item.roleName);
    // filter lấy role
    setData('roles', listRole);
    return this.authInfo = {
      id: authInfo.auth.id,
      username: authInfo.auth.username,
      isAuthenticated: authInfo.isAuthenticated,
      avatar: authInfo.auth.avatar,
      roles: listRole,
      name: authInfo.auth.name,
      email: authInfo.auth.email,
      token: authInfo.token,
    };
  }

  setInfoAfterUpdate(res: any) {
    setData('name', res.name);
    setData('avatar', res.avatar);
  }

  // remove or defualt
  logout() {
    // set Defualt
    setData('id', 0);
    setData('username', '');
    setData('name', '');
    setData('token', null);
    setData('roles', []);
    setData('avatar', '');
    setData('isAuthenticated', false);
    this.authInfo = {
      id: 0,
      username: '',
      isAuthenticated: false,
      avatar: '',
      roles: [],
      name: '',
      email: '',
      token: '',
    };
    this.currentUserInfoSubject.next(this.authInfo);
  }
}
