import {Injectable, ɵConsole} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApprovePlaneButtonService {

  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    console.log(localStorage.getItem('email'));
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }


   approvePlane(plane): Observable<any>{
    console.log(this.httpOptions )
    console.log(plane);
    return this.http.post(environment.apiUrl + '/approve', plane, this.httpOptions);
   }

   

}
