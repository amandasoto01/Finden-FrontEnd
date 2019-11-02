import { Component, OnInit } from '@angular/core';
import { WiringCenterService } from './addWiringCenter.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { WiringCenterModel } from "../../entities/request/wiringCenterModel";
import { BuildingModel } from "../../entities/request/buildingModel";
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-login',
  templateUrl: './addWiringCenter.component.html',
  styleUrls: ['./addWiringCenter.component.css']
})
export class AddWiringCenterComponent implements OnInit {

  portModel: PortModel;
  addWiringCenterForm: FormGroup;
  wiringCenter: WiringCenterModel;
  buildings: BuildingModel;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions:{
      delete: true,
      edit: false,
      position: 'right',
    },
    columns: {
      switch: {
        title: 'Switch',
        type: 'string',
      },
      numberofports: {
        title: 'Number of Ports',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor( private wiringCenterService: WiringCenterService,
               private formBuilder: FormBuilder) {
    this.wiringCenter = new WiringCenterModel();

  }

  ngOnInit() {
    this.addWiringCenterForm = this.formBuilder.group({
        idWiring: ['', [Validators.required]],
        wiringName: ['', [Validators.required] ],
        type: ['', [Validators.required] ],
        floor: ['', [Validators.required]],

    });
    this.wiringCenterService.getBuildingsMock().subscribe( data => {
       this.source.load(data);
     })
  }

  addWiringCenter(){
    const value = this.addWiringCenterForm.value;
    console.log(value);
    this.wiringCenter.building = value.building;
    this.wiringCenter.name = value.name;
    this.wiringCenter.floor = value.switch;
    this.wiringCenter.id = value.id;

    this.wiringCenterService.addWiringCenter(this.wiringCenter).subscribe(data=>{
        alert(data);
    },err=>{
        console.log(err);
        alert(err.error.text);
    })

  }




}
