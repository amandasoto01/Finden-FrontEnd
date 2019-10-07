import { Component, OnInit } from '@angular/core';
import { FindPortService } from './findPort.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './findPort.component.html',
  styleUrls: ['./findPort.component.css']
})
export class FindPortComponent implements OnInit {

 // userModel: UserModel;
  findPortForm: FormGroup;
  
  constructor( private findPortService: FindPortService,
               private formBuilder: FormBuilder) { 
  //  this.userModel = new UserModel();
  }

  ngOnInit() {
    this.findPortForm = this.formBuilder.group({
        port: ['', [Validators.required]]
    });
  }

  findPort(){
    const value = this.findPortForm.value;
    console.log(value);
    /*this.userModel.name = value.name;
    this.userModel.email = value.email;
    this.userModel.password = value.password;
    this.userModel.type = value.type;*/

    console.log("funcion ");
   // console.log(this.userModel);

    this.findPortService.findPort(this.findPortForm.value.port).subscribe(data => {
    
    },err=>{
      alert("error en el servidor");
    });
  }

 
}
