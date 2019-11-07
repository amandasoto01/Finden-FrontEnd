import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-button-download',
  templateUrl: './modifyUserButton.component.html',
  styleUrls: ['./modifyUserButton.component.css']
})
export class ModifyUserButtonComponent implements OnInit {


  @Input() value;    
  constructor(private router: Router ) { 


  }

  ngOnInit() {
  }
 
  showValue(){
    this.router.navigate(['/pages/modifyaccount/'+this.value]);
      console.log(this.value);
  }

}
