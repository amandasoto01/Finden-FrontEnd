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
 
  approvePlane(){
    let plane: {
        namePlane: string;
        status: boolean;
    }
    alert(this.value);
    console.log(this.value.name);
    plane.namePlane = this.value.name;
    plane.status = true;

    this.approvePlaneService.approvePlane(plane).subscribe( data =>{
      alert(data.res);
      this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error")
    });
  }

  rejectPlane(){
    let plane: {
        namePlane: string;
        status: boolean;
    }

    plane.namePlane = this.value.name;
    plane.status = false;

    console.log(this.value.name);

    this.approvePlaneService.approvePlane(this.value.name).subscribe( data =>{
        alert(data.res);
        this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error")
    });
  }
  
}
