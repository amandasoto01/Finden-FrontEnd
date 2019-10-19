import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddBuildingService {

   httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', 'lala');
  }

  create ( building ): Observable<any> {
    console.log(this.httpOptions )
     return this.http.post(environment.apiUrl + '/AddBuilding', building, this.httpOptions);
   }
}
