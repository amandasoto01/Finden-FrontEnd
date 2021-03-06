import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { ApprovePlaneService } from './approvePlane.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { TablePlanesModel } from "../../entities/internal/planesTableModel";
import { PlaneModel } from "../../entities/request/planeModel";
import { ApprovePlaneButtonComponent } from '../approve-plane-button/approvePlaneButton.component';
import { DownloadButtonComponent } from '../download-button/downloadButton.component';

@Component({
  selector: 'app-login',
  templateUrl: './approvePlane.component.html',
  styleUrls: ['./approvePlane.component.css']
})


/**
 * Componente que se encarga de la interfaz de aprobar o rechazar los planos cargados al sistema.
 * En esta interfaz se tiene una tabla en donde se muestran los planos que se encuentran en un estado de "revision", 
 * se podra descargar el plano y aprobar o rechazar.
 * Para la interacccion con los botones se hace uso de los componentes download-button y approve-plane-button 
 */


export class ApprovePlaneComponent  {
  tablePlaneModel: TablePlanesModel[];
  planeModel: PlaneModel;

  settings = {
    hideSubHeader: true,
    actions:false,
    columns: {
      name: {
        title: 'Plano',
        type: 'string',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      version: {
        title: 'Version',
        type: 'number',
      },
      descarga:{
        title:'Descargar',
        type: 'custom',
        renderComponent: DownloadButtonComponent,
      },
      acciones:{
        title:'Accion',
        type: 'custom',
        renderComponent: ApprovePlaneButtonComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  approvePlaneForm: FormGroup;

  constructor(private approvePlaneService: ApprovePlaneService,
              private formBuilder: FormBuilder) {
         this.tablePlaneModel = [];
  }

  ngOnInit(){

    this.approvePlaneForm = this.formBuilder.group({
        namePlane: ['', [Validators.required]],
        comments: ['', []],
    });


    
      

    this.approvePlaneService.getPlanes().subscribe( data => {
      this.tablePlaneModel = data;
      this.tablePlaneModel = [];
      
      for(let i = 0; i<data.length; i++){
        let newModel = new TablePlanesModel();
        if(data[i].status == 'en revisión'){
          newModel.name=data[i].name;
          newModel.description=data[i].description;
          newModel.version=data[i].version;
          newModel.descarga.name=data[i].name;
          newModel.descarga.version=data[i].version != '0' ? data[i].version : null;
          newModel.acciones.name = data[i].name;
          this.tablePlaneModel.push(newModel);
        }
        console.log(newModel);
      }
      
      this.source.load(this.tablePlaneModel);  
      
        },err=>{
          console.log(err);
          alert(err.error.text);
    });
  }


 
}