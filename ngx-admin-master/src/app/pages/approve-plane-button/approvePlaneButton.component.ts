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


/**
 * Componente que se encarga de llamar el servicio para aprobar o rechazar un plano.
 * Este componente recibe un valor al ser instanciado (value). Este valor contiene
 * el nombre del plano que va a ser aprobado o rechazado por el usuario.
 * Se utiliza el servicio de approvePlaneButtonService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */

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
