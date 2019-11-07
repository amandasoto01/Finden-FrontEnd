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

export class ApprovePlaneComponent  {
  tablePlaneModel: TablePlanesModel;
  planeModel: PlaneModel;

  settings = {
    hideSubHeader: true,
    actions:{
      delete: false,
      edit: false,
      position: 'right',
      hide: true,
    },
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
      accion:{
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

  }

  ngOnInit(){

    this.approvePlaneForm = this.formBuilder.group({
        namePlane: ['', [Validators.required]],
        comments: ['', []],
    });


    this.approvePlaneService.getPlanes().subscribe( data => {
        if(data == true){
            alert("Planos");
          }else{
            alert("No se pudo obtener los planos");
          }
        },err=>{
          console.log(err);
          alert(err.error.text);
    });
  }


  approve(){
    this.approvePlaneService.approvePlane(this.planeModel).subscribe( data =>{
      const value = this.approvePlaneForm.value;
      this.planeModel.name = value.namePlane;
      this.planeModel.status = true;
    });
  }

  reject(){
    this.approvePlaneService.approvePlane(this.planeModel).subscribe( data =>{
      const value = this.approvePlaneForm.value;
      this.planeModel.name = value.namePlane;
      this.planeModel.status = false;
    });
  }

  downloadPlane(planeName){
    this.approvePlaneService.downloadPlane(planeName).subscribe( data =>{
      this.generateFile(data);
    });
  }

  generateFile(data){
    const blob = new Blob([data], {
      'type': 'application/dxf'
    });
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = this.planeModel.name + '.dxf';
    a.click();
  }
}