import { Component, Input, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApprovePlaneButtonService } from '../approve-plane-button/approvePlaneButton.service';
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
              private approvePlaneButtonService: ApprovePlaneButtonService,
              private router: Router) {
  }
 
  approvePlane(){
    let plane = {
        namePlane: this.value.name,
        status: true,
    }
   /* alert(this.value);
    console.log(this.value);
    plane.name = this.value;
    plane.status = true;*/

    this.approvePlaneButtonService.approvePlane(plane).subscribe( data =>{
      alert(data.res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/pages/approveplane']));
     // this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error");
    });
  }

  rejectPlane(){
    console.log("aaaacaaa " + this.value.name);

    let plane= {
        namePlane: this.value.name,
        status: false,
    }

    //plane.name = this.value.name;
    //plane.status = false;

    
    this.approvePlaneButtonService.approvePlane(plane).subscribe( data =>{
        if(data.request == true){
          alert(data.res);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/pages/approveplane']));
        } else { 
          alert('Hubo un error en el servicio');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/pages/approveplane']));
        }
       // this.router.navigate(['/pages/homedti']);
    }, err => {
        alert("Hubo un error");
    });
  }
  
}
