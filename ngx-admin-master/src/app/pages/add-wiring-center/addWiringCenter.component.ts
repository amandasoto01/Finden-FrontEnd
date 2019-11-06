import { Component, OnInit } from '@angular/core';
import { WiringCenterService } from './addWiringCenter.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { WiringCenterModel } from "../../entities/request/wiringCenterModel";
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
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
  buildings: BuildingBasicInformationModel[];
  floors = [];
  tableData = [];

  
  settings = {
    hideSubHeader: true,
    actions:{
      delete: true,
      position: 'left',
      add: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },columns: {
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
    this.buildings = [];

  }

  ngOnInit() {
    this.addWiringCenterForm = this.formBuilder.group({
        idWiring: ['', [Validators.required]],
        wiringName: ['', [Validators.required] ],
        type: ['', [Validators.required] ],
        floor: ['', [Validators.required]],
        switch: ['', [Validators.required]],
        idPort: ['', [Validators.required]],


    });
    this.wiringCenterService.getBuildingsMock().subscribe( data => {
      // this.source.load(data);
      this.buildings = data; //mismos tipos de dato
     })
  }

  generateFloors($event){
    
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

  addPortSwitch(){
      this.tableData.push({
        'switch': this.addWiringCenterForm.value.switch,
        'numberofports': this.addWiringCenterForm.value.idPort,
      });
      this.source.load(this.tableData);
      this.source.refresh();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      for(let i = 0; i<this.tableData.length; ++i){
        if(this.tableData[i].switch == event.data.switch && this.tableData[i].numberofports == event.data.numberofports){
          this.tableData.splice(i, 1);
          break;
        }
      }
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
