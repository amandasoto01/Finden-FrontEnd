import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { HeaderService } from './header.service';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { ModifyAccountService } from '../../../pages/modify-account/modifyAccount.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  cant: number;
  username: string;


  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private headerService: HeaderService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modifyAcccountService: ModifyAccountService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    /*this.headerService.getUsername().subscribe(data => {

    });*/

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      
      let email = localStorage.getItem('email');
      //alert(email);

      this.headerService.getUsername(email).subscribe( data => { 
        //alert(data);
        this.username = data.username; 
      }, err => {
       // alert("error en el servidor");
         //console.log(err.error.text);
         
         //se hace esto porque el servicio se recibe con un error pero la data bien
         this.username = err.error.text;
      });

     if(this.getRol() == 'DTI'){
        //console.log("hola");
        this.cantPlanes();
      }

      this.router.events.subscribe(event => {
       // console.log(event);
        if(this.getRol() == 'DTI'){
          //console.log("hola");
          this.cantPlanes();
        }
      });
      
  }
  
  getUsername(){}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    if(this.getRol() == 'DTI'){
      this.router.navigate(['/pages/homedti']);
    }
    return false;
  }

  getRol(){
   return localStorage.getItem('rol');
  }

  cantPlanes(){
    this.headerService.amountOfPlanes().subscribe( data =>{
     // alert(data);
      this.cant=data;
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']); 
  }

  modificarCuenta(){
    //alert("pasoziduhf");
    let email = localStorage.getItem('email');
    this.router.navigate(['/pages/modifyaccount/'+email]); 
  }
}
