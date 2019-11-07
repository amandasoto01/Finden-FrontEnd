import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifyAccountService {
  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  create ( user ): Observable<any> {
       return this.http.post(environment.apiUrl + '/updateUser', user);
   }

   getAllUsers(): Observable<any>{
      return this.http.post(environment.apiUrl + '/getUsers', this.httpOptions);
   }

   getUser(email): Observable<any>{
    return this.http.post(environment.apiUrl + '/getUser',email, this.httpOptions);
 }

    updateUser(user): Observable<any>{
      return this.http.post(environment.apiUrl + '/updateUser',user, this.httpOptions);
    }
  
}