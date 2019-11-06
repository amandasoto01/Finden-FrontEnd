import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';


@Component({
  selector: 'app-button-download',
  templateUrl: './downloadButton.component.html',
  styleUrls: ['./downloadButton.component.css']
})
export class DownloadButtonComponent implements OnInit {


  @Input() value;    
  constructor( ) { 


  }

  ngOnInit() {
  }
 
  showValue(){
      console.log(this.value);
  }

}
