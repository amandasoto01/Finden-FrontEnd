import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadPlaneService } from './uploadPlane.service';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadPlane',
  templateUrl: './uploadPlane.component.html',
  styleUrls: ['./uploadPlane.component.css']
})
export class UploadPlaneComponent implements OnInit {
  filePlane: File;
  uploadPlaneForm: FormGroup;

  
  constructor(private uploadPlaneService: UploadPlaneService,
              private formBuilder: FormBuilder,
              private router: Router) { 
    this.uploadPlaneForm = this.formBuilder.group ({
      description: ['' ],
      fileUpload: [''],
    });
  }

  ngOnInit() {
  }
  
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.filePlane = event.target.files[0];
    }
  }

  submitPlane() {
    let input = new FormData();
    input.append('File', this.filePlane, this.filePlane.name);
    console.log(input);
    //return input;

    this.uploadPlaneService.checkPlane(input).subscribe(data =>{
        if(data.request && confirm(data.res)){
          this.uploadPlaneService.uploadPlane( input, this.uploadPlaneForm.value.description ).subscribe( 
            data2 =>{ 
              
                alert(data2.res);
                this.router.navigate(['/pages/homedti']);
             },
            err => { 
              alert("Hubo un error subiendo el archivo");
             }
          );
        }
    }, err =>{
      alert("El plano tiene un error");
    });


  }
}