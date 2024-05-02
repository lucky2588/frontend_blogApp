import { AuthService } from 'src/app/auth/serivce/auth.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


const BASE_URL = environment.URL + 'api/files';
@Injectable()
export class HandlenApiService {
  constructor(
    private http: HttpClient,
    private authService : AuthService)
    {}


    // create(): HandlenApiService {
    //   return new HandlenApiService();
    // }
  // attrach Token with API
  attachToken(){
    const valueOfToken = this.authService.getToken();
    const checkLoggin = this.authService.getAuthentication();

    if(checkLoggin && valueOfToken){
      const attachHttpWithToken = new HttpHeaders({ // attach HTTP with Token in Local
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + valueOfToken
      });
      const attach = {
        headers: attachHttpWithToken
      };
      return attach;
    }
    return null;
  }
    // push Image return value URL type  String ==> set value for filed
    uploadImage(fileToUpload: File): Observable<string> {
      if(!fileToUpload) return new Observable();
      const endpoint =`${BASE_URL}`+'/upload';
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post(endpoint,formData, { responseType: 'text'}).pipe(
          catchError(err => {
              console.error('UPLOAD IMAGE', err);
              return of('');
          })
      );
    }



}
