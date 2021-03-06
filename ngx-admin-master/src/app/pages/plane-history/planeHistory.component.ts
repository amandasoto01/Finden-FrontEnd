import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneHistoryService } from './planeHistory.service';
import { BuildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { BuildingBasicInformationModel} from '../../entities/request/buildingBasicInformationModel';
import { DownloadButtonComponent } from '../download-button/downloadButton.component';
import { PlaneHistoryTableModel } from '../../entities/internal/planeHistoryTableModel';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './planeHistory.component.html',
  styleUrls: ['./planeHistory.component.css']
})
/**
 * Componente que se encarga de la interfaz del historial de planos.
 * En esta interfaz se tiene un formulario donde el usuario (rol DTI) debe ingresar un edificio y un piso del cual desee 
 * obtener el historial. 
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Se muestra una tabla con todos los planos seleccionados donde se puede descargar un plano dado o borrar uno.
 * Al realizarse el envio del formulario, utiliza el servicio de planeHistoryService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */
export class PlaneHistoryComponent  {
  buildings: BuildingBasicInformationModel[];
  building: BuildingBasicInformationModel;
  addSwitchesForm: FormGroup;
  floors = [];
  planeHistoryTableModel: PlaneHistoryTableModel[];

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
        title: 'Plano',
        type: 'string',
      },
      version: {
        title: 'Version',
        type: 'number',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      status:{
        title: "Estado",
        type: 'string',
      },
      observation:{
        title: 'Revisado por',
        type: 'string',
      }, 
      descarga:{
        title:'Descargar',
        type: 'custom',
        renderComponent: DownloadButtonComponent,
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeHistoryService: PlaneHistoryService,
              private formBuilder: FormBuilder) {
    this.addSwitchesForm = this.formBuilder.group ({
      building: ['' ],
      floor: ['' ],
    });
    this.building = new BuildingBasicInformationModel();
    this.planeHistoryTableModel = []
  }

  ngOnInit(){

    this.planeHistoryService.getBuildings().subscribe( data => {
       console.log(data);
      // this.source.load(data);
      this.buildings = [];
      this.buildings = data;
    },err=>{
      alert("error en el servidor");
    });
  }


  generateFloors($event){
    //console.log("evento");
    //console.log($event);
    this.planeHistoryService.getFloors($event).subscribe(data =>{
      this.floors = data;
    },err=>{
      alert("error en el servidor");
    }); 
  }

  getPlaneBuilding(){
    let aux = {
      building: this.addSwitchesForm.value.building,
      floor: this.addSwitchesForm.value.floor,
    }

    this.planeHistoryService.getPlaneBuilding(aux).subscribe(data =>{
      this.planeHistoryTableModel = [];
      for(let i = 0; i<data.length; i++){
        let newModel = new PlaneHistoryTableModel();
        newModel.name=data[i].name;
        newModel.description=data[i].description;
        newModel.version=data[i].version;
        newModel.status=data[i].status;
        newModel.descarga.name=data[i].name;
        newModel.descarga.version=data[i].version != '0' ? data[i].version : null;
        newModel.observation = data[i].observation != null ? data[i].observation.substring(data[i].observation.indexOf(':') + 1) : '';
        this.planeHistoryTableModel.push(newModel);
      }
      this.source.load(this.planeHistoryTableModel)
    },err=>{
      alert("error en el servidor");
    }); 
  }

  /*
  getPlanes(){

  }
  */
  onDeleteConfirm(event): void {
  console.log(event);
    if(event.data.status != 'actual' && event.data.status != 'aprobado'){
      if (window.confirm('Esta seguro que desea borrar este plano?')) {
        //this.planeHistoryService.deletePlane();
        this.planeHistoryService.deletePlane(event.data.name).subscribe( data => {
            alert(data);
        }, err => {
            alert(err);
        });
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }else{
      alert("Solo se pueden borrar planos que tengan estado rechazado o en revisión");
    }
   
  }

  

}
