import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './createUser.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})
export class CreateUserComponent implements OnInit {

  loginModel: LoginModel;
  loginForm: FormGroup;

  constructor( private createUserService: CreateUserService,
               private formBuilder: FormBuilder) { 
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required] ]
    });
  }

  signIn(){
    const value = this.loginForm.value;
    console.log(value);
    this.loginModel.email = value.email;
    this.loginModel.password = value.password;
    console.log("funcion ");
    console.log(this.loginModel);
    this.createUserService.login(this.loginModel).subscribe(data => {
    localStorage.setItem('userEmail', this.loginModel.email); //Para guardar en la sesion 
    },err=>{
      alert("error en el servidor");
    });
  }

 
}
