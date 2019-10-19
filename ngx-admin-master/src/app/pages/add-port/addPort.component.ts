import { Component, OnInit } from '@angular/core';
import { AddPortService } from './addPort.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { buildingModel } from "../../entities/request/buildingModel";

@Component({
  selector: 'app-login',
  templateUrl: './addPort.component.html',
  styleUrls: ['./addPort.component.css']
})
export class AddPortComponent implements OnInit {

  portModel: PortModel;
  addPortForm: FormGroup;
  buildings: buildingModel;

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
    this.addPortService.getBuildingsMock().subscribe( data => {
       console.log(data);
       this.buildings = data;
     })
  }


  createAccount(){
    const value = this.addPortForm.value;
    console.log(value);
    this.portModel.building = value.building;
    this.portModel.portName = value.portName;
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


}
