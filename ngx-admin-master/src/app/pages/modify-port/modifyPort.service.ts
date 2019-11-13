import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifyPortService {

  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

   getBuildings ( ): Observable<any> {
      return this.http.get(environment.apiUrl + '/getBuildings' ,this.httpOptions);
   }

   getPort ( port ): Observable<any> {
     return this.http.post(environment.apiUrl + '/getPort' , port, this.httpOptions);
  }

  updatePort ( port ): Observable<any> {
    return this.http.post(environment.apiUrl + '/updatePort' , port, this.httpOptions);
 }

 deletePort(port): Observable<any>{
  return this.http.post(environment.apiUrl + '/deletePort', port,  this.httpOptions);
}


}
