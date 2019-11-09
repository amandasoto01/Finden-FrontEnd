import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

    httpOptions = {
        headers: new HttpHeaders({})
    };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  amountOfPlanes(): Observable<any>{
    return this.http.post(environment.apiUrl + '/planesToApprove' ,null,this.httpOptions);
   }

   getUsername(): Observable<any>{
       return this.http.get(environment.apiUrl + '/getUsername', this.httpOptions);
   }
  
}