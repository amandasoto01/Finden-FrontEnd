import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { HeaderService } from './header.service';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";

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
  usernameForm: FormGroup;

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
              private formBuilder: FormBuilder) {
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
      
      this.usernameForm = this.formBuilder.group({
        username: ['', [Validators.required]],
      });
    
      if(this.getRol() == 'DTI'){
        //console.log("hola");
        this.cantPlanes();
      }

      this.router.events.subscribe(event => {
        if(this.getRol() == 'DTI'){
          //console.log("hola");
          this.cantPlanes();
        }
      });

      
      /*this.headerService.getUsername(localStorage.getItem('email')).subscribe( data => { 
        this.username = data;
      })*/
  }

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
      this.cant=data;
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']); 
  }

  modificarCuenta(){
    this.router.navigate(['/pages/modifyaccount']); 
  }
}
