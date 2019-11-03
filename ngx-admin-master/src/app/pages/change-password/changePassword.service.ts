import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {
  }


   sendCode( user ): Observable<any>{
     return this.http.post(environment.apiUrl + '/send', user);
   }
   

   newPassword(user ): Observable<any>{
    return this.http.post(environment.apiUrl + '/password', user);
  }
}