import { Component, OnInit } from '@angular/core';
import { AddPortService } from './addPort.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
import { AvailablePortTypes } from '../../entities/internal/availablePortTypes';

@Component({
  selector: 'app-login',
  templateUrl: './addPort.component.html',
  styleUrls: ['./addPort.component.css']
})
export class AddPortComponent implements OnInit {

  portModel: PortModel;
  addPortForm: FormGroup;
  buildings: BuildingBasicInformationModel[];
  floors: number[];
  wiringCenters: string[];
  switch: number[];
  portTypes: AvailablePortTypes[] = [];

  constructor( private addPortService: AddPortService,
               private formBuilder: FormBuilder) {
    this.portModel = new PortModel();
  }

  ngOnInit() {
    this.addPortForm = this.formBuilder.group({
        building: ['', [Validators.required]],
        floor: ['', [Validators.required] ],
        portName: ['', [Validators.required] ],
        switch: ['', [Validators.required]],
        portSwitch: ['',[Validators.required]],
        type: ['',[Validators.required]],
        wiringCenter: ['',[Validators.required]],
    });
    
    this.portTypes.push(new AvailablePortTypes('VD', 'Voz y Datos'));
    this.portTypes.push(new AvailablePortTypes('D', 'Datos'));
    this.portTypes.push(new AvailablePortTypes('V', 'Voz'));

    this.addPortService.getBuildings().subscribe( data => {
       console.log(data);
       this.buildings = data;
     },err=>{
      console.log(err);
      alert(err.error.text);
    })
     
     this.addPortService.getWiringCenter().subscribe( data => {
      console.log(data);
      this.wiringCenters = data;
     },err=>{
      console.log(err);
      alert(err.error.text);
    })

    this.addPortService.getSwitches().subscribe( data => {
      console.log(data);
      this.switch = data;
     },err=>{
      console.log(err);
      alert(err.error.text);
    })
  }


  addPort(){
    const value = this.addPortForm.value;
    console.log(value);
    this.portModel.building = value.building;
    this.portModel.floor = value.floor;
    this.portModel.name = value.portName;
    this.portModel.switch = value.switch;
    this.portModel.portSwitch = value.portSwitch;
    this.portModel.type = value.type;
    this.portModel.wiringCenter = value.wiringCenter;

    console.log("funcion ");
    console.log(this.portModel);


    this.addPortService.create(this.portModel).subscribe(data => {
    //localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion
      alert(data);
    },err=>{
      console.log(err);
      alert(err.error.text);
    });
  }

  generateFloors($event){
    console.log($event)
    this.addPortService.getFloors($event).subscribe(
      data => {
        this.floors = data;
      }
    )
  }

}
