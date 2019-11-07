import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApprovePlaneService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  getPlanes (): Observable<any> {
     console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/getAllPlanes', localStorage.getItem('email'), this.httpOptions);
   }

   approvePlane(plane): Observable<any>{
    console.log(this.httpOptions )
    return this.http.post(environment.apiUrl + '/approve', this.httpOptions, plane);
   }
}
