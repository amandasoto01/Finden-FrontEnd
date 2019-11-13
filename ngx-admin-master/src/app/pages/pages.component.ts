import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_DTI, MENU_ITEMS_CONTRATISTA, MENU_ITEMS_MESA_DE_SERVICIOS } from './pages-menu';

/**
 * Definicion del componente de Pages. En este componente se instancia el menu que se le muestra al usuario.
 * El menu depende del rol del usuario dentro del sistema y es cargado del archivo pages-menu.ts
 * 
 */

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = localStorage.getItem('rol') == 'DTI' ? MENU_ITEMS_DTI : localStorage.getItem('rol') == 'contratista' ? MENU_ITEMS_CONTRATISTA : localStorage.getItem('rol') == 'mesa de servicios' ? MENU_ITEMS_MESA_DE_SERVICIOS : MENU_ITEMS  ;
}
