import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  loginForm: FormGroup;

  constructor( private loginService: LoginService,
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
    this.loginService.login(this.loginModel).subscribe(data => {

    },err=>{
      alert("error en el servidor");
    });
  }

 
}
