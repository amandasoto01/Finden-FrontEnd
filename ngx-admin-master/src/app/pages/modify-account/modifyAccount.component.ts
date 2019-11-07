import { Component, OnInit } from '@angular/core';
import { ModifyAccountService } from './modifyAccount.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AvailableTypes } from "../../entities/internal/availableTypes";
import { AllUsersModel } from "../../entities/request/allUsersModel";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './modifyAccount.component.html',
  styleUrls: ['./modifyAccount.component.css']
})
export class ModifyAccountComponent implements OnInit {

  userModel: UserModel;
  createUserForm: FormGroup;
  users: AllUsersModel;
  email: string;

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
               private formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private router: Router) { 
    this.userModel = new UserModel();
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
      this.userModel.password = data.password;
      this.userModel.type = data.type;
    });

  }
  
  updateUser(){
    const value = this.createUserForm.value;
    console.log(value);
    this.userModel.name = value.name;
    this.userModel.email = value.email;
    this.userModel.type = value.type.value;

    this.modifyAccountService.updateUser(this.userModel).subscribe( data => {
      alert(data.res);
      this.router.navigate(['/pages/manageaccount']);
    }, err =>{
      alert("Error en el servidor");
    });


  }

 
}
