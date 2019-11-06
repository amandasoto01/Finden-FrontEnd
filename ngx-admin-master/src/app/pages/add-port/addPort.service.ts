import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPortService {

  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  create( port ): Observable<any> {
     return this.http.post(environment.apiUrl + '/addPort', port, this.httpOptions);
   }

   getBuildings ( ): Observable<any> {
      return this.http.get(environment.apiUrl + '/getBuildings' ,this.httpOptions);
   }

   getFloors ( building ): Observable<any> {
     return this.http.post(environment.apiUrl + '/getFloors' , building, this.httpOptions);
  }

   getWiringCenter(): Observable<any>{
    return this.http.get(environment.apiUrl + '/getWiringCenter', this.httpOptions);
   }

   getSwitches(): Observable<any>{
    return this.http.post(environment.apiUrl + '/getSwitches', 'a', this.httpOptions);
   }

}
