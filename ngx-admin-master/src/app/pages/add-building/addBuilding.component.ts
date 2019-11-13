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


/**
 * Componente que se encarga de la interfaz de Añadir Edificio.
 * En esta interfaz se tiene un formulario donde el usuario puede ingresar: nombre, numero de edificio,
 * pisos y sotanos. Este formulario tiene validaciones de las entradas y permite ser enviado cuando
 * todos los datos han sido llenados
 * Al realizarse el envio del formulario, utiliza el servicio de addBUildingService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */
export class AddBuildingComponent implements OnInit {

  buildingModel: BuildingModel;
  addBuildingForm: FormGroup;


  constructor( private addBuildingService: AddBuildingService,
               private formBuilder: FormBuilder,
               private router: Router) {
    this.buildingModel = new BuildingModel();

  }

  ngOnInit() {
    //creacion de instancia del formulario
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
