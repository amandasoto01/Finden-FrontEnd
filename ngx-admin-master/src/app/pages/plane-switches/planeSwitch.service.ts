import {Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneSwitchService {

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

  getFloors(building): Observable <any>{
    return this.http.post(environment.apiUrl + '/getFloors', building, this.httpOptions);
  }

  getPortsFloor(edificio, piso): Observable<any>{
    return this.http.post(environment.apiUrl + '/getPortsFloor/' + edificio + '/' + piso, '',  this.httpOptions);
  }

  addSwitch(portSwitches): Observable<any>{
    return this.http.put(environment.apiUrl + '/switches', portSwitches,  this.httpOptions);
  }
  
}
