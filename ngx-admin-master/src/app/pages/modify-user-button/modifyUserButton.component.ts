import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ManageAccountService } from '../manage-account/manageAccount.service';
import { UserModel } from '../../entities/request/userModel';


@Component({
  selector: 'app-button-download',
  templateUrl: './modifyUserButton.component.html',
  styleUrls: ['./modifyUserButton.component.css']
})
/**
 * Componente que se encarga de la redireccion a la pagina de modificar usuario.
 * Al ser inicializado recibe un parametro (value) con el correo del usuario que se va a modificar.
 */
export class ModifyUserButtonComponent implements OnInit {
  
  arr: [];

  @Input() value;    
  constructor(private router: Router) { 
  }

  ngOnInit() {
  }
 
  showValue(){
    this.router.navigate(['/pages/modifyaccount/'+this.value]);
      console.log(this.value);
  }

}
