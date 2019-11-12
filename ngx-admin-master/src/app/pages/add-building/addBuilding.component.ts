import { Component, OnInit } from '@angular/core';
import { AddBuildingService } from './addBuilding.service';
import { BuildingModel } from "../../entities/request/buildingModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './addBuilding.component.html',
  styleUrls: ['./addBuilding.component.css']
})

export class AddBuildingComponent implements OnInit {

  buildingModel: BuildingModel;
  addBuildingForm: FormGroup;


  constructor( private addBuildingService: AddBuildingService,
               private formBuilder: FormBuilder,
               private router: Router) {
    this.buildingModel = new BuildingModel();

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
    let aux = {
      name: value.name,
      number: value.buildingNumber,
      nfloors: value.floors,
      nbasement: value.basements,
    }
    

    console.log("funcion ");
    console.log(this.buildingModel);

    this.addBuildingService.create(aux).subscribe(data => {
      if(data.request == true){
        alert("Creado exitosamente");
        this.router.navigate(['/pages/homedti']);
      } else {
        alert(data.res);
      }
    },err=>{
      alert(err.error.text);
    });
  }


}
