import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneHistoryService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  getBuildings ( ): Observable<any> {
    console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/getBuildings', this.httpOptions);
  }

  getPlanes(): Observable<any> {
     console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/getPlaneBuilding', this.httpOptions);
   }

  delete ( user ): Observable<any> {
     console.log(this.httpOptions ) 
     return this.http.post(environment.apiUrl + '/DeleteUser', user, this.httpOptions);
   }

   getUsersMock (): Observable<any> {
      let mockUsers = [
        {name: 'juan', email: 'juan@gmail.com', type: 'DTI'},
        {name: 'paco', email: 'paco@gmail.com', type: 'DTI'}
      ];
      return of(mockUsers);
    }
}
