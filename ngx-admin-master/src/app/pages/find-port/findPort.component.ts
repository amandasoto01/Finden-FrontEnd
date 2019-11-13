import { Component, OnInit } from '@angular/core';
import { FindPortService } from './findPort.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { InfoPortModel } from '../../entities/request/infoPortModel';

@Component({
  selector: 'app-login',
  templateUrl: './findPort.component.html',
  styleUrls: ['./findPort.component.css']
})


/**
 * Componente que se encarga de la interfaz para la busqueda de un puerto.
 * En esta interfaz se tiene un fomrulario donde el usuario debe ingresar el numero de puerto.
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de finPortService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 * Al realizar este llamado se muestra la informacion correspondiente al puerto ingresado. 
 */



export class FindPortComponent implements OnInit {

 // userModel: UserModel;
  findPortForm: FormGroup;
  infoPortModel: InfoPortModel;
  
  constructor( private findPortService: FindPortService,
               private formBuilder: FormBuilder) { 
        this.infoPortModel = new InfoPortModel();
        this.infoPortModel.found = false;
  //  this.userModel = new UserModel();
  }

  ngOnInit() {
    this.findPortForm = this.formBuilder.group({
        port: ['', [Validators.required]]
    });
  }

  findPort(){
    const value = this.findPortForm.value;
   // console.log(value);
   // console.log("funcion ");
  

    this.findPortService.findPort(this.findPortForm.value.port).subscribe(data => {
        console.log("respuesta back " + data);  
      if(data == null){
          alert ("Port not found");
          this.infoPortModel.found = false;
        }else{
          this.infoPortModel.found = true;
          this.infoPortModel.mac = data.mac;
          this.infoPortModel.state = data.state;
          this.infoPortModel.speed = data.speed;
          this.infoPortModel.wiringCenter = data.wiringCenter;
          this.infoPortModel.building = data.building;
          this.infoPortModel.floor = data.floor;
        }
    },err=>{
      alert("error en el servidor");
    });
  }

  cleanView(){
    this.infoPortModel = new InfoPortModel();
  }
 
}
