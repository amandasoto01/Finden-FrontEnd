import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneSwitchService } from './planeSwitch.service';
import { BuildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './planeSwitch.component.html',
  styleUrls: ['./planeSwitch.component.css']
})

export class PlaneSwitchComponent  {
  buildings: BuildingModel;

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
      port: {
        title: 'Port',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      wiringCenter: {
        title: 'Wiring Center',
        type: 'string',
      }, 
      switch:{
          title: 'Switch',
          type: 'number',    
      },
      portSwitch:{
          title: 'Port in switch',
          type: 'integer',
      }


    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeSwitchService: PlaneSwitchService) {

  }

  ngOnInit(){
    this.planeSwitchService.getBuildingsMock().subscribe( data => {
       console.log(data);
      // this.source.load(data);
      this.buildings = new BuildingModel();
      this.buildings = data;
    })
  }

}
