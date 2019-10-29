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
      {name: 'juan', email: 'juan@gmail.com', type: 'DTI'},
      {name: 'paco', email: 'paco@gmail.com', type: 'DTI'}
    ];
    return of(mockUsers);
  }
}
