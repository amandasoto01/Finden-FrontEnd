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
    console.log(value);
    this.loginModel.email = value.email;
    this.loginModel.password = value.password;
    console.log("funcion ");
    console.log(this.loginModel);
    //localStorage.setItem('rol', 'DTI');  

    this.loginService.login(this.loginModel).subscribe(data => {
    localStorage.setItem('email', this.loginModel.email); //Para guardar en la sesion 
    localStorage.setItem('rol', data.res);
    console.log(data);
    
    if(data.res == 'DTI'){
      //Navigate to dashboard after login using router  
      this.router.navigate(['/pages/homedti']); 
    }else if(data.res =='contratista'){
      this.router.navigate(['pages/uploadplane']);
    }else if(data.res=='mesa de servicios'){
      this.router.navigate(['pages/findport']);
    }
     
    },err=>{
      alert("error en el servidor");
      //this.router.navigate(['/pages/uploadplane']); 
    });
  }

 
}
