import { Component, Input, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DownloadButtonService } from './downloadButton.service';


@Component({
  selector: 'app-button-download',
  templateUrl: './downloadButton.component.html',
  styleUrls: ['./downloadButton.component.css']
})

/**
 * Componente que se encarga de llamar el servicio para descargar un plano.
 * Este componente recibe un valor al ser instanciado (value). Este valor contiene
 * el nombre del plano que va a ser descargado.
 * Se utiliza el servicio de downloadButtonService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */


export class DownloadButtonComponent {


  @Input() value;    
  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient,
              private downloadButtonService: DownloadButtonService) {
    this.httpOptions.headers = this.httpOptions.headers.set('email', localStorage.getItem('email'));
  }
 
  downloadPlane(){
    let aux = {
      namePlane: this.value.name,
      version: this.value.version
    }
    console.log("Aux");
    console.log(aux);
    this.downloadButtonService.downloadFile(aux).subscribe( data =>{
      console.log('+++++++');
      console.log(data);
      this.generateFile(data);
    });
  }

  generateFile(data){
    const blob = new Blob([data], 
      {type: 'dxf/dxf;charset=utf-8'}
    );
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = this.value.name;
    a.click();
  }
}
