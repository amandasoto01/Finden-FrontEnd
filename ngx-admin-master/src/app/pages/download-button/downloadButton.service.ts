import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadButtonService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }

  downloadFile(data): Observable<any> {
    let headers = new HttpHeaders().set('email', localStorage.getItem('email') );
    return this.http.post(environment.apiUrl + '/getPlane', data , {headers: headers, responseType: 'arraybuffer'});
  }
  
}
