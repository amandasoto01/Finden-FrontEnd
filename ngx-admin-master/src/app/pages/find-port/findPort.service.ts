import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindPortService {

  constructor(private http: HttpClient) {
  }

  findPort ( port ): Observable<any> {
       return this.http.post(environment.apiUrl + '/findport', port);
   }
}