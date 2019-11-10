import { Component, OnInit } from '@angular/core';
import { ModifyPortService } from './modifyPort.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
import { AvailablePortTypes } from '../../entities/internal/availablePortTypes';
import { AddPortService } from '../add-port/addPort.service';

@Component({
  selector: 'app-login',
  templateUrl: './modifyPort.component.html',
  styleUrls: ['./modifyPort.component.css']
})
export class ModifyPortComponent implements OnInit {

  portModel: PortModel;
  modifyPortForm: FormGroup;
  building: string;
  buildings: BuildingBasicInformationModel[];
  floors: number[];
  wiringCenters: string[];
  switch: number[];
  portTypes: AvailablePortTypes[] = [];

  constructor( private modifyPortService: ModifyPortService,
               private formBuilder: FormBuilder,
              private addPortService: AddPortService) {
    this.portModel = new PortModel();
  }

  ngOnInit() {
    this.modifyPortForm = this.formBuilder.group({
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

   /* this.addPortService.getBuildings().subscribe( data => {
       console.log(data);
       this.buildings = data;
     },err=>{
      console.log(err);
      alert(err.error.text);
    })

    this.addPortService.getFloors(this.buildings).subscribe( data => {
      console.log(data);
      this.buildings = data;
    },err=>{
     console.log(err);
     alert(err.error.text);
   })*/
  }


  getInfo(){
    this.modifyPortService.getPort(this.modifyPortForm.value.portName).subscribe( data => {
      console.log(data);
      this.modifyPortForm.setValue({
        building: data.building,
        floor: data.floor,
        wiringCenter:data.wiringCenter,
        switch: data.switch,
        portSwitch: data.nportSwitch,
        type: data.type,
        portName: this.modifyPortForm.value.portName
      })
    })
    console.log(this.modifyPortForm);
  }

  modifyPort(){
    const value = this.modifyPortForm.value;
    console.log(value);
    this.portModel.building = value.building;
    this.portModel.floor = value.floor;
    this.portModel.name = value.portName;
    this.portModel.switch = value.switch;
    this.portModel.portSwitch = value.portSwitch;
    this.portModel.type = value.type;
    this.portModel.wiringCenter = value.wiringCenter;
    this.portModel.port = value.portName;

   // console.log("funcion ");
    //console.log(this.portModel);


    this.modifyPortService.updatePort(this.portModel).subscribe(data => {
    //localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion
     alert(data);
    },err=>{
      console.log(err);
      alert(err.error.text);
    });
  }


}
