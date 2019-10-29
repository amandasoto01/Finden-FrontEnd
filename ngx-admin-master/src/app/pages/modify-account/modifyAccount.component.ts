import { Component, OnInit } from '@angular/core';
import { ModifyAccountService } from './modifyAccount.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";

@Component({
  selector: 'app-login',
  templateUrl: './modifyAccount.component.html',
  styleUrls: ['./modifyAccount.component.css']
})
export class ModifyAccountComponent implements OnInit {

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

  constructor( private modifyAccountService: ModifyAccountService,
               private formBuilder: FormBuilder) { 
    this.userModel = new UserModel();

  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
        name: [''],
        email: ['', [Validators.required, Validators.email] ],
        password: ['' ],
        confirmPassword: [''],
        type: ['']
    });
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

    if(this.userModel.password != value.confirmPassword){
        alert("Contrase;as distintas");
       return; 
    }

    this.modifyAccountService.create(this.userModel).subscribe(data => {
    localStorage.setItem('userEmail', this.userModel.email); //Para guardar en la sesion 
    },err=>{
      alert("error en el servidor");
    });
  }

 
}
