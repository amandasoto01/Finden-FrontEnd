import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  
  httpOptions = {
    headers: new HttpHeaders({})
  };
  
  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  create ( user ): Observable<any> {
       return this.http.post(environment.apiUrl + '/create', user, this.httpOptions);
   }
}