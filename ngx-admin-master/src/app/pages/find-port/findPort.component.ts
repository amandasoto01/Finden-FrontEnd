import { Component, OnInit } from '@angular/core';
import { FindPortService } from './findPort.service';
import { UserModel } from "../../entities/request/userModel"; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { InfoPortModel } from '../../entities/request/infoPortModel';

@Component({
  selector: 'app-login',
  templateUrl: './findPort.component.html',
  styleUrls: ['./findPort.component.css']
})
export class FindPortComponent implements OnInit {

 // userModel: UserModel;
  findPortForm: FormGroup;
  infoPortModel: InfoPortModel;
  
  constructor( private findPortService: FindPortService,
               private formBuilder: FormBuilder) { 
        this.infoPortModel = new InfoPortModel();
        this.infoPortModel.found = true;
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
    console.log("funcion ");
  

    this.findPortService.findPort(this.findPortForm.value.port).subscribe(data => {
        if(!data.found){
          alert ("Port not found");
          this.infoPortModel.found = data.found;
        }else{
          this.infoPortModel.mac = data.mac;
          this.infoPortModel.state = data.state;
          this.infoPortModel.speed = data.speed;
          this.infoPortModel.found = data.found;
          this.infoPortModel.wiringCenter = data.wiringCenter;
          this.infoPortModel.building = data.building;
          this.infoPortModel.floor = data.floor;
        }
    },err=>{
      alert("error en el servidor");
    });
  }

  cleanView(){
    this.infoPortModel = new InfoPortModel();
  }
 
}
