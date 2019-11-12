import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { ManagePortsService } from './managePorts.service';
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { SwitchModel } from "../../entities/request/switchModel";
import { PortTableModel } from '../../entities/request/portTableModel';

@Component({
  selector: 'app-login',
  templateUrl: './managePorts.component.html',
  styleUrls: ['./managePorts.component.css']
})

export class PlaneSwitchComponent  {
  buildings: BuildingBasicInformationModel[];
  addSwitchesForm: FormGroup;
  floors = [];
  switch: SwitchModel;

  settings = {
    hideSubHeader: true,
    actions:{
      columnTitle: 'Delete',
      edit: true,
      position: 'right',
      reset: true,
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
        title: 'Port',
        type: 'string',
        editable: false,
      },
      type: {
        title: 'Type',
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
        title: 'Wiring Center',
        type: 'string',
      }, 
      switch:{
          title: 'Switch',
          type: 'number',    
      },  
      NPortSwitch:{
          title: 'Port in switch',
          type: 'integer',
      }


    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private managePortsService: ManagePortsService,  private formBuilder: FormBuilder) {
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
    this.managePortsService.getBuildings().subscribe( data => {
       console.log(data);
      // this.source.load(data);
      this.buildings = [];
      this.buildings = data; //tienen que ser los mismos datos
    })
  }

  generateFloors($event){
    this.managePortsService.getFloors($event).subscribe( data => {
        console.log(data);
      this.floors = data;
    },err=>{
      alert("error en el servidor");
    });
  }

  onDeleteConfirm(event): void{
    if(window.confirm('Esta seguro de que quiere borrar esto?')){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }

  getPorts(){

    this.source.empty();
    this.managePortsService.getPortsFloor(this.addSwitchesForm.value.building, this.addSwitchesForm.value.floor).subscribe( data => {
        console.log(data);
        for(let i = 0; i<data.length; i++){
          console.log(data[i]);
          console.log(data[i].port);
          let row = new PortTableModel();
          row.port = data[i].port;
          console.log(row);
          this.switch.ports.push(row);
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
          this.switch.ports[i].nPortSwitch = event.newData.portSwitch;
          this.switch.ports[i].type = event.newData.type;
          this.switch.ports[i].wiringCenter = event.newData.wiringCenter;
          break;
      }
    }
    event.confirm.resolve();
  }

  saveInfo(){
    this.switch.building = this.addSwitchesForm.value.building;
    this.switch.floor = this.addSwitchesForm.value.floor;


    this.managePortsService.addSwitch(this.switch).subscribe( data => {
          //console.log(data);
        this.floors = data;
      },err=>{
        alert("error en el servidor");
      });
  }
  

}
