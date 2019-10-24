import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private router: Router){

    }

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
        Observable<boolean> | Promise<boolean> | boolean {
            let rol = localStorage.getItem('rol');
            //Si el usuario esta logeado tiene rol definido
            if( rol !== undefined ) {
                const roles = next.data['roles'] as Array<string>;
                //Ver si su rol tiene privilegios para entrar osea si esta en el arreglo
                if( roles.indexOf(rol) !== -1 ){
                    return true;
                }
            } else {
                alert("No tienes permisos para acceder a la pagina");
                return false;
            }
            return false;
        }
}