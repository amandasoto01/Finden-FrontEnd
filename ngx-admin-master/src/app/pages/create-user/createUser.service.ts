import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http: HttpClient) {
  }

  create ( user ): Observable<any> {
       return this.http.post(environment.apiUrl + '/create', user);
   }
}