import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { CommentDetail } from 'src/app/pages/models/public';
import { CommentPost } from 'src/app/shared/models/typePublic';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.URL + 'api/public/blog';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

     // get HttpInterceptorFn ==> refDoc : https://angular.io/api/common/http/HttpInterceptorFn
     HttpInterceptorFn:any
     private _items$  = new BehaviorSubject<CommentDetail[]>([]);
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

     fetch(id:number){
       this.getAllOfComment(id);
     }

     getAllOfComment(id:number){
        this.http.get<CommentDetail[]>(BASE_URL+`/${id}/getComments`).subscribe(
         (next : any) =>{
           this._items$.next(next.data);
         },
        )
     }



     save(res:CommentPost){
       this.reTurnToken();
     return this.http.post<CommentPost>(BASE_URL +'/postComment',res,this.HttpInterceptorFn);
     }
}
