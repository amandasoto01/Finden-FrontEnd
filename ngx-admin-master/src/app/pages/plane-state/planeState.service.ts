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
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  getAllPlanes (): Observable<any> {
     console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/getAllPlanes', this.httpOptions);
   }

  getRejectedPlanes (): Observable<any> {
    console.log(this.httpOptions )
    return this.http.post(environment.apiUrl + '/getRejectedPlanes', this.httpOptions);
  }

  getApprovedPlanes (): Observable<any> {
    console.log(this.httpOptions )
    return this.http.post(environment.apiUrl + '/getApprovedPlanes', this.httpOptions);
  }



   getPlanesMock (): Observable<any> {
      let mockPlanes = [
        {name: 'juan', description: 'juan@gmail.com', status: false},
        {name: 'paco', description: 'paco@gmail.com', status: true}
      ];
      return of(mockPlanes);
    }
}
