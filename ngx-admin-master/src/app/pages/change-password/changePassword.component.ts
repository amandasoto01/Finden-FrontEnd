import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './changePassword.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { NewPassword }  from '../../entities/request/newPasswordModel';
import { Router } from "@angular/router";


@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  setNewPasswordForm: FormGroup;
  newPassword: NewPassword;

  constructor( private changePasswordService: ChangePasswordService,
               private formBuilder: FormBuilder,
               private router: Router) { 
      this.newPassword = new NewPassword();
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ]
    });
    this.setNewPasswordForm = this.formBuilder.group({
      code: ['', [Validators.required] ],
      password: ['', [Validators.required] ],
      confirmPassword: ['', [Validators.required] ]

  });
  }

  send(){
    const value = this.changePasswordForm.value;
    this.newPassword.email = value.email;

    this.changePasswordService.sendCode(this.newPassword.email).subscribe( data =>{
       
      if(data){
         alert("El codigo fue enviado a tu correo");
       }else{
         alert("El correo ingresado no se encuentra registrado en el sistema");
       }
    },err=>{
      alert("error en el servidor");
      //this.router.navigate(['/pages/uploadplane']); 
    });
    
  }

  setNewPassword(){
    const val = this.setNewPasswordForm.value;
    this.newPassword.code = val.code;

    
    if(val.password == val.confirmPassword){
      this.newPassword.password = val.password;
      this.changePasswordService.newPassword(this.newPassword).subscribe( data =>{
       
        if(data){
           alert("Se cambio la contraseña exitosamente");
           this.router.navigate(['/auth/login']);
         }else{
           alert("Hubo un error");
         }
      },err=>{
        alert("error en el servidor");
        //this.router.navigate(['/pages/uploadplane']); 
      });
    }else{
      alert("Las contraseñas ingresadas no coinciden");
    }
    

    
  }
}
