import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneHistoryService } from './planeHistory.service';
import { BuildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { BuildingBasicInformationModel} from '../../entities/request/buildingBasicInformationModel';

@Component({
  selector: 'app-login',
  templateUrl: './planeHistory.component.html',
  styleUrls: ['./planeHistory.component.css']
})

export class PlaneHistoryComponent  {
  buildings: BuildingBasicInformationModel[];
  addSwitchesForm: FormGroup;
  floors = [];

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
    this.planeHistoryService.getBuildingsMock().subscribe( data => {
       console.log(data);
      // this.source.load(data);
      this.buildings = [];
      this.buildings = data;
    })
  }


  generateFloors($event){
    console.log("evento");
    //console.log($event);
   let min;
   let max; 

    for(let i=0; i<this.buildings.length; i++){
      if($event == this.buildings[i].num){
        min = this.buildings[i].min;
        max = this.buildings[i].max;
        break;
      }
    }
    
    for(let j=min, k=0; j<=max; j++,k++){
      this.floors[k]= j;
    }
    
  }
}
