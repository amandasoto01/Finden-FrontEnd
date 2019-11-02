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
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      version: {
        title: 'Version',
        type: 'any',
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

    this.approvePlaneService.getUsersMock().subscribe( data => {
       console.log(data);
       this.source.load(data);
    })

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
      this.planeModel.comments = value.comments;
      this.planeModel.status = true;
    });
  }

  reject(){
    this.approvePlaneService.approvePlane(this.planeModel).subscribe( data =>{
      const value = this.approvePlaneForm.value;
      this.planeModel.name = value.namePlane;
      this.planeModel.comments = value.comments;
      this.planeModel.status = false;
    })
  }




}
