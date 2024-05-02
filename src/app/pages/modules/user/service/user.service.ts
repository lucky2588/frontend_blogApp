import { HandlenApiService } from './../../../../shared/service/handlen-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeInfoUser, ChangePassword } from '../models/userInfo';

const BASE_URL = environment.URL + 'api/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // get HttpInterceptorFn ==> refDoc : https://angular.io/api/common/http/HttpInterceptorFn
  HttpInterceptorFn:any

  constructor(private router: Router, private http: HttpClient,
    private serviceAPI : HandlenApiService,
  ) {
    this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
  }


  reTurnToken(){ // --> get Token when User other login
    this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
  }


  getUserById(id: any): Observable<any> {
    this.reTurnToken();
    return this.http.get(BASE_URL +'/'+id, this.HttpInterceptorFn);
  }

  updateUser(res: ChangeInfoUser): Observable<any> {
    this.reTurnToken();
    return this.http.post<ChangeInfoUser>(BASE_URL +'/changeInfo',res,this.HttpInterceptorFn);
  }

  changePassword(res: ChangePassword): Observable<any> {
    this.reTurnToken();
    return this.http.post<ChangePassword>(BASE_URL +'/changePassword',res,this.HttpInterceptorFn);
  }



}
