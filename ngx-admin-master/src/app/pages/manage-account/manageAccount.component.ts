import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { ManageAccountService } from './manageAccount.service';
import { buildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './manageAccount.component.html',
  styleUrls: ['./manageAccount.component.css']
})

export class ManageAccountComponent  {

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
      email: {
        title: 'Email',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private manageAccountService: ManageAccountService) {

  }

  ngOnInit(){
    this.manageAccountService.getUsersMock().subscribe( data => {
       console.log(data);
       this.source.load(data);
    })
  }



  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();

    this.manageAccountService.delete("hola").subscribe( data => {
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
