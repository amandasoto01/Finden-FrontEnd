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
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }


   getBuildings ( ): Observable<any> {
     console.log(this.httpOptions )
      return this.http.get(environment.apiUrl + '/getBuildings', this.httpOptions);
   }

   addWiringCenter (data): Observable<any> {
    console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/addWiringCenter',data, this.httpOptions);
  }

    getFloors(building): Observable <any>{
    return this.http.post(environment.apiUrl + '/getFloors', building, this.httpOptions);
  }
}
