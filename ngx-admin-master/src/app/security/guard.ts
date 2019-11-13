import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

/**
 * Esta clase sirve para interceptar las peticiones de cambio de ruta dentro de la aplicacion.
 * Se verifica si la ruta tiene algun tipo de restriccion dada en la definicion de las mismas, y siendo el caso
 * se revisa que el usuario que esta queriendo acceder a la ruta posea los permisos necesarios.
 * En este caso, el rol del usuario dentro del sistema. Por ejemplo DTI.
 **/

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