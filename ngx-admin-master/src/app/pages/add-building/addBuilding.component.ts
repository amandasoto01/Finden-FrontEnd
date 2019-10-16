import { Component, OnInit } from '@angular/core';
import { addBuildingService } from './addBuilding.service';
import { buildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './addBuilding.component.html',
  styleUrls: ['./addBuilding.component.css']
})
export class AddBuildingComponent implements OnInit {

  buildingModel: buildingModel;
  addBuildingForm: FormGroup;


  constructor( private addBuildingService: addBuildingService,
               private formBuilder: FormBuilder) {
    this.buildingModel = new buildingModel();

  }

  ngOnInit() {
    this.addBuildingForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        buildingNumber: ['', [Validators.required] ],
        floors: ['', [Validators.required] ],
        basements: ['', [Validators.required] ]
    });
  }

  addBuilding(){
    const value = this.addBuildingForm.value;
    console.log(value);
    this.buildingModel.name = value.name;
    this.buildingModel.buildingNumber = value.buildingNumber;
    this.buildingModel.floor = value.floor;
    this.buildingModel.basement = value.basement;

    console.log("funcion ");
    console.log(this.buildingModel);

    this.addBuildingService.create(this.buildingModel).subscribe(data => {
      //localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion
      alert(data);
    },err=>{
      //console.log(err);
      //alert(err.error.text);
    });
  }


}
