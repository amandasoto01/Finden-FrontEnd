import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './changePassword.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { NewPassword }  from '../../entities/request/newPasswordModel';
import { Router } from "@angular/router";
import { UserModel } from '../../entities/request/userModel';


@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})



/**
 * Componente que se encarga de la interfaz para realizar el cambio/recuperar contraseña.
 * En esta interfaz se tiene un formulario donde el usuario puede ingresar su correo electronico, codigo de verificacion, 
 * contraseña y confirmacion de contraseña.
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de changePasswordService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 */


export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  setNewPasswordForm: FormGroup;
  newPassword: NewPassword;
  userModel: UserModel;

  constructor( private changePasswordService: ChangePasswordService,
               private formBuilder: FormBuilder,
               private router: Router) { 
      this.newPassword = new NewPassword();
      this.userModel = new UserModel();
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

    this.userModel.email = this.newPassword.email;
    this.changePasswordService.sendCode(this.userModel).subscribe( data =>{
       
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
      console.log(this.newPassword);
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
