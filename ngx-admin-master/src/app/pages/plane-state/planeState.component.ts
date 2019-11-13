import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneStateService } from './planeState.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './planeState.component.html',
  styleUrls: ['./planeState.component.css']
})

/**
 * Componente que se encarga de la interfaz para mostrar el estado de los planos.
 * En esta interfaz incialmente se cargan y muestran todos los planos subidos por el usuario, este puede filtrar su busqueda 
 * Al realizarse el envio del formulario, utiliza el servicio de planeStateService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */

export class PlaneStateComponent  {

  settings = {
    hideSubHeader: true,
    actions:false,
    columns: {
      name: {
        title: 'Nombre del Plano',
        type: 'number',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      status: {
        title: 'Estados',
        type: 'boolean',
      },
      observation: {
        title: 'Observacion',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeStateServices: PlaneStateService) {

  }

  ngOnInit(){
    this.planeStateServices.getAllPlanes().subscribe( data => {
       console.log(data);
       this.source.load(data);
    })
  }

  approvedPlanes(){
    this.planeStateServices.getApprovedPlanes().subscribe(data=>{
      console.log(data);  
      this.source.load(data);
    },err=>{
        console.log(err);
        alert(err.error.text);
    });
    }

    rejectedPlanes(){
      this.planeStateServices.getRejectedPlanes().subscribe(data=>{
          this.source.load(data);
      },err=>{
          console.log(err);
          alert(err.error.text);
      });
    }

    allPlanes(){
      this.planeStateServices.getAllPlanes().subscribe(data=>{
          this.source.load(data);
      },err=>{
          console.log(err);
          alert(err.error.text);
      });
    }

    downloadPlane(event){
      console.log(event.data);
    }
}
