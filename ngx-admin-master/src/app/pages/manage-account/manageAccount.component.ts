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

/**
 * Componente que se encarga de la interfaz para la administrcion de los usuarios.
 * En esta interfaz se tiene una tabla donde se tienen los usuarios del sistema. Para cada uno de los usuarios
 * se tiene nombre, correo, tipo, boton para modificar y boton para eliminar.
 * El componente utiliza el servicio de manageAccount.service para cargar la informacion de los usuarios del sistema.
 */

export class ManageAccountComponent  {

  settings = {
    hideSubHeader: true,
    actions:{
      columnTitle: 'Borrar',
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      email: {
        title: 'Correo',
        type: 'number',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      type: {
        title: 'Tipo',
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
      console.log(data);
      let arr = [];
      for( let i = 0; i < data.length; i++){
        if(data[i].type =='contratista'){
            data[i].type='constructora';
        }
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
    if (window.confirm('Esta seguro que desea borrar el usuario?')) {
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
