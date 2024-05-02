import { environment } from '../../../environments/environment';
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
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/pages/modules/user/models/userInfo';
import { AuthInfo } from '../models/authModels';
import { CanActivateFn } from '@angular/router';
import { getData } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  //   guardPremissonAdmin: CanActivateFn = (route, state) => {
  //   const permissionAllow = ["ADMIN","USER"];
  //   const listRole = getData("roles").map((item: any) => item.roleName);
  //    const isAllow =  permissionAllow.every(permission => listRole.includes(permission))
  //    if(isAllow) {
  //     return true;
  //    }else{
  //       return false;
  //    }
  // };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const permissionAllow = ['ADMIN'];
    if (getData("isAuthenticated") == false || getData("isAuthenticated") == undefined) {
      this.router.navigate(['./Authorize']);
      return false;
    }
    const checkRoles =  permissionAllow.every(item =>  getData('roles').includes(item))
    // const listRole = getData('roles').map((item: any) => item.roleName);
    // console.log(listRole);
    // const isAllow = listRole.every(permissionAllow);
    // console.log(isAllow);
    if (checkRoles) {
      return true;
    } else {
      this.router.navigate(['./Authorize']);
      return false;
    }
  }
}
