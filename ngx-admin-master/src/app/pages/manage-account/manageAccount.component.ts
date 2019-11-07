import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { ManageAccountService } from './manageAccount.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { ModifyUserButtonComponent } from "../modify-user-button/modifyUserButton.component";

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
      modify:{
        title: 'Modificar',
        type: 'custom',
        renderComponent: ModifyUserButtonComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private manageAccountService: ManageAccountService) {

  }

  ngOnInit(){
    this.manageAccountService.getUsers().subscribe( data => {
      let arr = [];
      for( let i = 0; i < data.length; i++){
        let aux = {
          email: data[i].email,
          name: data[i].name,
          type: data[i].type,
          modify: data[i].email,
        }
        arr.push(aux);
      } 
       this.source.load(arr);
    },err=>{
      console.log(err);
      alert(err.error.text);
    });
  }



  onDeleteConfirm(event): void {
    console.log("hola " + event);
    console.log("borrar " + event.data.email);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    
    this.manageAccountService.delete(event.data.email).subscribe( data => {
        if(data.request){
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
