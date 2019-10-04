import { Component, OnInit } from '@angular/core';
import { UploadPlaneService } from './uploadPlane.service';

@Component({
  selector: 'app-uploadPlane',
  templateUrl: './uploadPlane.component.html',
  styleUrls: ['./uploadPlane.component.css']
})
export class UploadPlaneComponent implements OnInit {
  filePlane: any;
  
  constructor(private uploadPlaneService: UploadPlaneService) { 

  }

  ngOnInit() {
  }
  
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.filePlane = file;
     // this.form.get('fileUpload').setValue(file);
    }
  }

  private submitPlane(): any {
    const data = this.filePlane;
    const input = new FormData();
    input.append('name', data.name);
    input.append('file', data.fileUpload);
    //return input;
    this.uploadPlaneService.uploadPlane( input ).subscribe( 
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