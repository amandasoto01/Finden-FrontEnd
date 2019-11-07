import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

import { Component, OnInit } from '@angular/core';
import { PlaneStateService } from './planeState.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './planeState.component.html',
  styleUrls: ['./planeState.component.css']
})

export class PlaneStateComponent  {

  settings = {
    hideSubHeader: true,
    actions:false,
    columns: {
      name: {
        title: 'Name',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'boolean',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private planeStateServices: PlaneStateService) {

  }

  ngOnInit(){
    this.planeStateServices.getAllPlanes().subscribe( data => {
       console.log(data);
       this.source.load(data);
    })
  }

  approvedPlanes(){
    this.planeStateServices.getApprovedPlanes().subscribe(data=>{
        this.source.load(data);
    },err=>{
        console.log(err);
        alert(err.error.text);
    });
    }

    rejectedPlanes(){
      this.planeStateServices.getRejectedPlanes().subscribe(data=>{
          this.source.load(data);
      },err=>{
          console.log(err);
          alert(err.error.text);
      });
    }

    allPlanes(){
      this.planeStateServices.getAllPlanes().subscribe(data=>{
          this.source.load(data);
      },err=>{
          console.log(err);
          alert(err.error.text);
      });
    }

    downloadPlane(event){
      console.log(event.data);
    }
}
