import { Component, Input, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApprovePlaneService } from '../approve-plane/approvePlane.service';
import { PlaneModel } from '../../entities/request/planeModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-button-download',
  templateUrl: './approvePlaneButton.component.html',
  styleUrls: ['./approvePlaneButton.component.css']
})

export class ApprovePlaneButtonComponent {


  @Input() value;   
  planeModel: PlaneModel; 
  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient,
              private approvePlaneService: ApprovePlaneService,
              private router: Router) {
  }
 
  approve(){
    
    this.approvePlaneService.approvePlane(this.value.name).subscribe( data =>{
      alert(data.res);
      this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error")
    });
  }

  reject(){
    this.approvePlaneService.approvePlane(this.value.name).subscribe( data =>{
        alert(data.res);
        this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error")
    });
  }
  
}
