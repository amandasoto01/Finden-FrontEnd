import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_DTI, MENU_ITEMS_CONTRATISTA, MENU_ITEMS_MESA_DE_SERVICIOS } from './pages-menu';

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

  menu = localStorage.getItem('rol') == 'DTI' ? MENU_ITEMS_DTI : localStorage.getItem('rol') == 'Contratista' ? MENU_ITEMS_CONTRATISTA : localStorage.getItem('rol') == 'Mesa de Servicios' ? MENU_ITEMS_MESA_DE_SERVICIOS : MENU_ITEMS  ;
}
