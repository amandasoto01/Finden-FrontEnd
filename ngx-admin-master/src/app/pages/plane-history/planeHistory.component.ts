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

@Component({
  selector: 'app-login',
  templateUrl: './planeHistory.component.html',
  styleUrls: ['./planeHistory.component.css']
})

export class PlaneHistoryComponent  {
  buildings: BuildingBasicInformationModel[];
  addSwitchesForm: FormGroup;
  floors = [];
  planeHistoryTableModel: PlaneHistoryTableModel;

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
      version: {
        title: 'Version',
        type: 'number',
      }, 
      approvedBy:{
          title: 'Approved By',
          type: 'string',    
      },
      date:{
          title: 'Date',
          type: 'string',
      },
      descarga:{
        title:'Descargar',
        type: 'custom',
        renderComponent: DownloadButtonComponent,
      },


    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeHistoryService: PlaneHistoryService,
              private formBuilder: FormBuilder) {
    this.addSwitchesForm = this.formBuilder.group ({
      building: ['' ],
      floor: ['' ],
    });
    this.planeHistoryTableModel = new PlaneHistoryTableModel();
    this.planeHistoryTableModel.approvedBy='yo';
    this.planeHistoryTableModel.name='yo';
    this.planeHistoryTableModel.date='yo';
    this.planeHistoryTableModel.description='yo';
    this.planeHistoryTableModel.version='1';
    this.planeHistoryTableModel.descarga.name='yo';
    this.planeHistoryTableModel.descarga.version='1';
    this.source.add(this.planeHistoryTableModel);
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
    this.addSwitchesForm.value.building;
    this.addSwitchesForm.value.floor; 
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Esta seguro que desea borrar este plano?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  

}
