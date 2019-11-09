import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindPortService {

  httpOptions = {
    headers: new HttpHeaders({})
  };
  
  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  findPort ( port ): Observable<any> {
       return this.http.post(environment.apiUrl + '/findPort', port, this.httpOptions);
   }
}