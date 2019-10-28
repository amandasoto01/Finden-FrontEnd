import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WiringCenterService {

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

   addWiringCenter (data): Observable<any> {
    console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/addWiringCenter',data, this.httpOptions);
  }


   getBuildingsMock (): Observable<any> {
      let mockBuildings = [
        {name: 'giraldo', num: 3, nfloors: 0 , nbasements: 0},
        {name: 'baron', num: 2, nfloors: 0 , nbasements: 0},
        {name: 'teologia', num: 94, nfloors: 0 , nbasements: 0}
      ];
      return of(mockBuildings);
    }
}
