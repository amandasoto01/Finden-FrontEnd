import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './createUser.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})
export class CreateUserComponent implements OnInit {

  userModel: UserModel;
  createUserForm: FormGroup;
  availableTypes: AvailableTypes[] = [
    {
      value: '1',
      label: 'DTI' 
    },
    {
      value: '2',
      label: 'Contratista' 
    },
    {
      value: '3',
      label: 'Mesa de Servicios' 
    }
  ];

  constructor( private createUserService: CreateUserService,
               private formBuilder: FormBuilder) { 
    this.userModel = new UserModel();

  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required] ],
        type: ['', [Validators.required] ]
    });
  }

  createAccount(){
    const value = this.createUserForm.value;
    console.log(value);
    this.userModel.name = value.name;
    this.userModel.email = value.email;
    this.userModel.password = value.password;
    this.userModel.type = value.type.value;

    console.log("funcion ");
    console.log(this.userModel);

    this.createUserService.create(this.userModel).subscribe(data => {
    localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion 
      alert(data);
    },err=>{
      console.log(err);
      alert(err.error.text);
    });
  }

 
}
