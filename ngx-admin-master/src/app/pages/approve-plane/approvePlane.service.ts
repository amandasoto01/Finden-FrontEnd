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
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  getPlanes (): Observable<any> {
     console.log(this.httpOptions )
     return this.http.get(environment.apiUrl + '/getPlanes', this.httpOptions);
   }

   approvePlane(plane): Observable<any>{
    console.log(this.httpOptions )
    return this.http.put(environment.apiUrl + '/approve', this.httpOptions);
   }

   getUsersMock (): Observable<any> {
    let mockUsers = [
      {name: 'Fernando Baron', description: 'Segundo Piso', version: '1.0'},
      {name: 'Gabriel Giraldo', description: 'Sotano 1', version: '1.0'}
    ];
    return of(mockUsers);
  }

  downloadPlane(plane): Observable<any>{
    return this.http.get(environment.apiUrl + '/approve' + 'plane', this.httpOptions);
   }
}
