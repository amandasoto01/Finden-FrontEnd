import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './createUser.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})

/**
 * Componente que se encarga de la interfaz para la creacion de un usuario nuevo.
 * En esta interfaz se tiene un formulario donde el usuario (rol DTI) debe llenar correo electronico,
 * contraseña, nombre y tipo de usuario 
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de createUserService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */


export class CreateUserComponent implements OnInit {

  userModel: UserModel;
  createUserForm: FormGroup;
  availableTypes: AvailableTypes[] = [
    {
      value: '1',
      label: 'DTI' 
    },
    {
      value: '3',
      label: 'Constructora' //planos menos aprobar plano 
    },
    {
      value: '2',
      label: 'Mesa de Servicios'  //find port y modificar usuario
    }
  ];

  constructor( private createUserService: CreateUserService,
               private formBuilder: FormBuilder,
               private router: Router) { 
    this.userModel = new UserModel();

  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required] ],
        type: ['', [Validators.required] ]
    });
    console.log(this.createUserForm);
  }

  createAccount(){
    const value = this.createUserForm.value;
    console.log(value);
    this.userModel.name = value.name;
    this.userModel.email = value.email;
    this.userModel.password = value.password;
    this.userModel.type = value.type;

    console.log("funcion ");
    console.log(this.userModel);

    this.createUserService.create(this.userModel).subscribe(data => {
      if(data.request == true){
        localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion 
        alert(data.res);
        this.router.navigate(['/pages/manageaccount'])
      } else {
        alert(data.res);
      }
    },err=>{
      console.log(err);
      alert(err.error.text);
    });
  }

 
}
