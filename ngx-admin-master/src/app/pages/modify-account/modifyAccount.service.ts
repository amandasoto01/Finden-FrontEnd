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
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  create ( user ): Observable<any> {
       return this.http.put(environment.apiUrl + '/updateUser', user);
   }

   getAllUsers(): Observable<any>{
      return this.http.get(environment.apiUrl + '/getUsers', this.httpOptions);
   }

   getAllUsersMock(): Observable<any>{
    let mockUsers = [
      {name: 'amanda', email: 'amanda@javeriana.edu.co', type: 'DTI'},
      {name: 'bastos', email: 'bastos@javeriana.edu.co', type: 'DTI'},
      {name: 'javier', email: 'javier@javeriana.edu.co', type: 'DTI'}
    ];
    return of(mockUsers);
   }
}