import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageAccountService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  getUsers (): Observable<any> {
     console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/getUsers', this.httpOptions);
   }

  delete ( user ): Observable<any> {
     console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/DeleteUser', user, this.httpOptions);
   }

   getUsersMock (): Observable<any> {
      let mockUsers = [
        {name: 'juan', email: 'juan@gmail.com', type: 'DTI'},
        {name: 'paco', email: 'paco@gmail.com', type: 'DTI'}
      ];
      return of(mockUsers);
    }
}
