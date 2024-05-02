import { AuthService } from 'src/app/auth/serivce/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import { environment } from 'src/environments/environment';
import { CategoryDetail } from '../../models/category';

const BASE_URL = environment.URL + 'api/manage/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    // get HttpInterceptorFn ==> refDoc : https://angular.io/api/common/http/HttpInterceptorFn
    HttpInterceptorFn:any
    private _items$  = new BehaviorSubject<any[]>([]);
    get items$() {
      return this._items$.asObservable();
    }

    constructor(private router: Router, private http: HttpClient,
      private authService : AuthService,
      private serviceAPI : HandlenApiService,
    ) {
          this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
    }

    reTurnToken(){ // --> get Token when User other login
      this.HttpInterceptorFn = this.serviceAPI.attachToken()!;
    }

    fetch(){
      this.getAllOfCategory();
    }

    getAllOfCategory(){
      this.reTurnToken();
       this.http.get(BASE_URL+'/getAll',this.HttpInterceptorFn).subscribe(
        (next : any)=>{
          this._items$.next(next);
        },
       )

    }

    getAll(){
      this.reTurnToken();
      return this.http.get(BASE_URL+'/getAll',this.HttpInterceptorFn);

    }


    save(res:CategoryDetail){
      this.reTurnToken();
    return this.http.post<CategoryDetail>(BASE_URL +'/save',res,this.HttpInterceptorFn);
    }





}
