import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneHistoryService } from './planeHistory.service';
import { buildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './planeHistoryService.component.html',
  styleUrls: ['./PlaneHistoryService.component.css']
})

export class PlaneHistoryComponent  {

  settings = {
    hideSubHeader: true,
    actions:{
      columnTitle: 'Delete',
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      Version: {
        title: 'Version',
        type: 'number',
      }, 
      ApprovedBy:{
          title: 'Approved By',
          type: 'string',    
      },
      Date:{
          title: 'Date',
          type: 'string',
      }


    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeHistoryService: PlaneHistoryService) {

  }

  ngOnInit(){
    this.planeHistoryService.getUsersMock().subscribe( data => {
       console.log(data);
       this.source.load(data);
    })
  }



  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();

    this.planeHistoryService.delete("hola").subscribe( data => {
        if(data == true){ 
          alert("Se borro el usuario");
        }else{
          alert("No se pudo borrar al usuario");
        }
      },err=>{
        console.log(err);
        alert(err.error.text);
      });
    } else {
      event.confirm.reject();
    }
  }
}
