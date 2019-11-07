import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneStateService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  getAllPlanes (): Observable<any> {
     console.log(this.httpOptions )
     return this.http.get(environment.apiUrl + '/getAllPlanes', this.httpOptions);
   }

  getRejectedPlanes (): Observable<any> {
    console.log(this.httpOptions )
    return this.http.get(environment.apiUrl + '/getRejectedPlanes', this.httpOptions);
  }

  getApprovedPlanes (): Observable<any> {
    console.log(this.httpOptions )
    return this.http.get(environment.apiUrl + '/getApprovedPlanes', this.httpOptions);
  }


}
