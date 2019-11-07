import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPlaneService {

  
  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  uploadPlane( plane , description ): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('description', description);
       return this.http.post(environment.apiUrl + '/addPlane', plane, this.httpOptions);
   }

   checkPlane( plane ): Observable<any> {
       return this.http.post(environment.apiUrl + '/checkPlane', plane, this.httpOptions);
   }
}