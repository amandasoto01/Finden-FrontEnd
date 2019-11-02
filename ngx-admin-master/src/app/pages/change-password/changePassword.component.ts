import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './changePassword.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loginModel: LoginModel;
  changePasswordForm: FormGroup;
  codeForm: FormGroup;

  constructor( private changePasswordService: ChangePasswordService,
               private formBuilder: FormBuilder) { 
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ]
    });
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required] ]
  });
  }

  signIn(){
    const value = this.changePasswordForm.value;
    console.log(value);
    this.loginModel.email = value.email;
    this.loginModel.password = value.password;
    console.log("funcion ");
    console.log(this.loginModel);
    this.changePasswordService.login(this.loginModel).subscribe(data => {
    localStorage.setItem('userEmail', this.loginModel.email); //Para guardar en la sesion 
    },err=>{
      alert("error en el servidor");
    });
  }

  validate(){
      
  }

  send(){

  }
}
