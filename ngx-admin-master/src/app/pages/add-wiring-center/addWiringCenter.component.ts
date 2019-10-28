import { Component, OnInit } from '@angular/core';
import { WiringCenterService } from './addWiringCenter.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { WiringCenterModel } from "../../entities/request/wiringCenterModel";
import { buildingModel } from "../../entities/request/buildingModel";

@Component({
  selector: 'app-login',
  templateUrl: './addPort.component.html',
  styleUrls: ['./addPort.component.css']
})
export class WiringCenterComponent implements OnInit {

  portModel: PortModel;
  addWiringCenterForm: FormGroup;
  wiringCenter: WiringCenterModel;
  buildings: buildingModel;

  constructor( private wiringCenterService: WiringCenterService,
               private formBuilder: FormBuilder) {
    this.wiringCenter = new WiringCenterModel();

  }

  ngOnInit() {
    this.addWiringCenterForm = this.formBuilder.group({
        building: ['', [Validators.required]],
        floor: ['', [Validators.required] ],
        name: ['', [Validators.required] ],
        id: ['', [Validators.required]],
       
    });
    this.wiringCenterService.getBuildingsMock().subscribe( data => {
       console.log(data);
       this.buildings = data;
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
