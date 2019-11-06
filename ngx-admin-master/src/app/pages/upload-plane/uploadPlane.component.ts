import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadPlaneService } from './uploadPlane.service';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-uploadPlane',
  templateUrl: './uploadPlane.component.html',
  styleUrls: ['./uploadPlane.component.css']
})
export class UploadPlaneComponent implements OnInit {
  filePlane: File;
  uploadPlaneForm: FormGroup;

  
  constructor(private uploadPlaneService: UploadPlaneService,
              private formBuilder: FormBuilder) { 
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
    this.uploadPlaneService.uploadPlane( input, this.uploadPlaneForm.value.description ).subscribe( 
      data =>{ 
        if( data.resultado == "Yes" )
          alert(" Se subio exitosamente! ");
        else
          alert(" No se subio el archivo! ");
       },
      err => { 
        alert("Hubo un error subiendo el archivo");
       }
    );
  }
}