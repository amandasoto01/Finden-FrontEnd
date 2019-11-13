import { Component, OnInit } from '@angular/core';
import { AddPortService } from './addPort.service';
import { PortModel } from "../../entities/request/portModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { BuildingBasicInformationModel } from "../../entities/request/buildingBasicInformationModel";
import { AvailablePortTypes } from '../../entities/internal/availablePortTypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './addPort.component.html',
  styleUrls: ['./addPort.component.css']
})


/**
 * Componente que se encarga de la interfaz de Añadir un puerto nuevo.
 * En esta interfaz se tiene un formulario donde el usuario puede ingresar: Edifico, piso, centro de cableado, 
 * nombre del puerto, switch, numero de puerto en el switch y el tipo. 
 * Al cargar la vista se utiliza el servicio addPortService para saber los edificos, cargar los pisos dependiendo del
 * edifcio seleccionado, y el centro de cableado. 
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de addPortService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */


export class AddPortComponent implements OnInit {

  portModel: PortModel;
  addPortForm: FormGroup;
  buildings: BuildingBasicInformationModel[];
  floors: number[];
  wiringCenters: string[];
  switch: number[];
  portTypes: AvailablePortTypes[] = [];

  constructor( private addPortService: AddPortService,
               private formBuilder: FormBuilder,
               private router: Router) {
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
      if(data.request == true){
        alert(data.res);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/pages/addport']));
      } else {
        alert(data.res);
      }
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
