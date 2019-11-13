import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneSwitchService } from './planeSwitch.service';
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { SwitchModel } from "../../entities/request/switchModel";
import { PortTableModel } from '../../entities/request/portTableModel';

@Component({
  selector: 'app-login',
  templateUrl: './planeSwitch.component.html',
  styleUrls: ['./planeSwitch.component.css']
})

/**
 * Componente que se encarga de mostrar los switches que tiene un plano. En este componente se tiene una tabla
 * que se encarga con la informacion de los switches en un piso de un edificio especifico seleccionado por el usuario.
 * Para cada uno de los switches se puede ver informacion como puerto, tipo, centro de cableado, posicion del puerto en el switch.
 * Adicionalmente, el usuario puede modificar la informacion de cada uno de los switches o eliminarlos del sistema.
 * En esta interfaz se tiene un fomrulario donde el usuario debe ingresar el numero de puerto.
 * Al actualizar la informacion de estos, el usuario tiene la opcion de guardar los cambios y actualizar el sistema de informacion
 * con los datos ingresados.
 * Utiliza el servicio de planeSwitch.service para hacer las peticiones HTTP al servidor con cada uno de los servicios necesarios
 * para esta vista.
 */

export class PlaneSwitchComponent  {
  buildings: BuildingBasicInformationModel[];
  addSwitchesForm: FormGroup;
  floors = [];
  switch: SwitchModel;
  portsToUpdate: boolean[];

  settings = {
    hideSubHeader: true,
    actions:{
      columnTitle: 'Eliminar',
      edit: true,
      position: 'right',
    },
    edit:{
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      port: {
        title: 'Puerto',
        type: 'string',
        editable: false,
      },
      type: {
        title: 'Tipo',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'VD', title:'Voz y Datos'},
              {value: 'D', title:'Datos'},
              {value: 'V', title:'Voz'},
            ],
          },
        },
      },
      wiringCenter: {
        title: 'Centro de Cableado',
        type: 'string',
      }, 
      switch:{
          title: 'Switch',
          type: 'number',    
      },  
      nPortSwitch:{
          title: 'Puerto en el switch',
          type: 'integer',
      }


    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeSwitchService: PlaneSwitchService,  private formBuilder: FormBuilder) {
    this.addSwitchesForm = this.formBuilder.group({
      building: ['', [Validators.required]],
      idWiring: ['', [Validators.required]],
      wiringName: ['', [Validators.required] ],
      type: ['', [Validators.required] ],
      floor: ['', [Validators.required]],

  });

    this.switch = new SwitchModel();
  }

  ngOnInit(){
    this.planeSwitchService.getBuildings().subscribe( data => {
       console.log(data);
      // this.source.load(data);
      this.buildings = [];
      this.buildings = data; //tienen que ser los mismos datos
      this.portsToUpdate = [];
    });
  }

  generateFloors($event){
    this.planeSwitchService.getFloors($event).subscribe( data => {
        console.log(data);
      this.floors = data;
    },err=>{
      alert("error en el servidor");
    });
  }

  onDeleteConfirm(event): void{
    if(window.confirm('Esta seguro de que quiere borrar esto?')){
      event.confirm.resolve();
      for(let i = 0; i < this.switch.ports.length; i++){
        if(this.switch.ports[i].port == event.data.port){
            this.planeSwitchService.deletePort(this.switch.ports[i].port).subscribe( data => {
              event.confirm.resolve();
            },err=>{
              alert("Error borrando el puerto");
              event.confirm.reject();
            });
            this.portsToUpdate[i] = false;
            break;
        }
      }
    }else{
      event.confirm.reject();
    }
  }

  getPorts(){
    this.switch.ports = [];
    this.portsToUpdate = [];
    this.planeSwitchService.getPortsFloor(this.addSwitchesForm.value.building, this.addSwitchesForm.value.floor).subscribe( data => {
        console.log(data);
        for(let i = 0; i<data.length; i++){
          console.log(data[i]);
          console.log(data[i].port);
          let row = new PortTableModel();
          row.port = data[i].port;
          row.type = data[i].type; 
          row.switch = data[i].switch;
          row.wiringCenter = data[i].writingCenter;
          row.nPortSwitch = data[i].portInSwitch;

          console.log(row);
          this.switch.ports.push(row);
          this.portsToUpdate.push(false);
        }
        this.source.load(this.switch.ports);
    },err=>{
      alert("error en el servidor");
    });
  }

  onEditConfirm(event){
    console.log(event.newData);
    for(let i = 0; i < this.switch.ports.length; i++){
      if(this.switch.ports[i].port == event.newData.port){
          this.switch.ports[i].switch = event.newData.switch;
          this.switch.ports[i].nPortSwitch = event.newData.NPortSwitch;
          this.switch.ports[i].type = event.newData.type;
          this.switch.ports[i].name = event.newData.port;
          this.switch.ports[i].wiringCenter = event.newData.wiringCenter;
          this.portsToUpdate[i] = true;
          break;
      }
    }
    event.confirm.resolve();
  }

  saveInfo(){
    this.switch.building = this.addSwitchesForm.value.building;
    this.switch.floor = this.addSwitchesForm.value.floor;

    let switchToUpdate: SwitchModel = new SwitchModel();
    switchToUpdate.building = this.switch.building;
    switchToUpdate.floor = this.switch.floor;

    for(let i = 0; i<this.portsToUpdate.length; i++){
      if(this.portsToUpdate[i] == true){
        switchToUpdate.ports.push(this.switch.ports[i]);
      }
    }

    this.planeSwitchService.addSwitch(switchToUpdate).subscribe( data => {
        alert(data);
      },err=>{
        alert(err);
      });
  }
     

}
