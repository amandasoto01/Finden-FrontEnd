import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginModel } from "../../entities/request/loginModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Componente que se encarga de la interfaz para el inicio de sesion de los usuarios.
 * En esta interfaz se tiene un fomulario donde el usuario ddebe ingresar su correo electronico y contraseña.
 * Este formulario tiene validaciones de las entradas y permite ser enviado cuando todos los datos han sido llenados.
 * Al realizarse el envio del formulario, utiliza el servicio de loginService para enviar una solicitud
 * http al servidor con el servicio y los datos correspondientes.
 * Adicionalmente es el encargado de redireccionar al usuario al home correspondiente dependiendo de su rol.  
 */

export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  loginForm: FormGroup;

  constructor( private loginService: LoginService,
               private formBuilder: FormBuilder,
               // The router to navigate inside the application
               private router: Router) { 
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
    this.loginModel.email = value.email;
    this.loginModel.password = value.password;
    //console.log("funcion ");
    //console.log(this.loginModel);
    //localStorage.setItem('rol', 'DTI');  

    this.loginService.login(this.loginModel).subscribe(data => {
    localStorage.setItem('email', this.loginModel.email); //Para guardar en la sesion 
    localStorage.setItem('rol', data.res);
    //console.log(data);
    
    if(data.res == 'DTI'){
      //Navigate to homepage after login using router  
      this.router.navigate(['/pages/homedti']); 
    }else if(data.res =='contratista'){
      //alert('contratista');
      this.router.navigate(['pages/homecontratista']);
    }else if(data.res=='mesa de servicios'){
      this.router.navigate(['pages/homemesadeservicios']);
    }else{
      alert("Correo o contraseña incorrecta");
    }
     
    },err=>{
      alert("error en el servidor");
    });
  }

 
}
