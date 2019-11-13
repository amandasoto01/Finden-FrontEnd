import { Component, OnInit } from '@angular/core';
import { ModifyAccountService } from './modifyAccount.service';
import { UpdateUserModel } from "../../entities/request/updateUserModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { AllUsersModel } from "../../entities/request/allUsersModel";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../@core/data/users';

/**
 * Componente que se encarga de la interfaz para la modificacion de un usuario nuevo.
 * En esta interfaz se tiene un formulario donde el usuario (rol DTI) puede modificar nombre de usuario y ver el tipo de usuario
 * y el correo electronico asociado. 
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de modifyUserService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */


@Component({
  selector: 'app-login',
  templateUrl: './modifyAccount.component.html',
  styleUrls: ['./modifyAccount.component.css']
})
export class ModifyAccountComponent implements OnInit {

  userModel: UpdateUserModel;
  createUserForm: FormGroup;
  users: AllUsersModel;
  email: string;
  
  availableTypes: AvailableTypes[] = [
    {
      value: '1',
      label: 'DTI' 
    },
    {
      value: '3',
      label: 'Constructora' 
    },
    {
      value: '2',
      label: 'Mesa de Servicios' 
    }
  ];

  constructor( private modifyAccountService: ModifyAccountService,
               private formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private router: Router) { 
    this.userModel = new UpdateUserModel();
    this.users = new AllUsersModel();
  }

  ngOnInit() {
    this.email=this.activatedRoute.snapshot.paramMap.get('email');
    this.createUserForm = this.formBuilder.group({
        name: [''],
        email: ['', [Validators.required, Validators.email] ],
        type: ['']
    });

    this.modifyAccountService.getUser(this.email).subscribe(data =>{
      this.createUserForm.setValue({
        name: data.name,
        email: data.email,
        type: "" + data.type,
      })
      //this.userModel.password = data.password;
      //this.userModel.type = data.type;
    });

  }
  
  updateUser(){
    const value = this.createUserForm.value;
    console.log(value);
    this.userModel.name = value.name;
    this.userModel.email = value.email;
    this.userModel.type = value.type;
    console.log(this.userModel);

    this.modifyAccountService.updateUser(this.userModel).subscribe( data => {
      alert(data.res);
      this.router.navigate(['/pages/manageaccount']);
    }, err =>{
      alert("Error en el servidor");
    });


  }

  getRol(){
    return localStorage.getItem('rol');
   }
 
}
