import { NbMenuItem } from '@nebular/theme';

//menu para cuando no se tiene ningun rol en el sistema
//No deberia entrar aqui dado que solo hay 3 roles en el sistema
export const MENU_ITEMS: NbMenuItem[] = [
];


//menu para rol DTI
export const MENU_ITEMS_DTI: NbMenuItem[] = [
  {
    title: 'Manejar Cuentas',
    icon: 'people-outline',
    children: [
      {
        title: 'Crear Cuenta',
        link:'/pages/createuser',
      },
      {
        title: 'Manejar Cuenta',
        link: '/pages/manageaccount',
      },
    ]
  },
  {
    title: 'Planos',
    icon: 'map-outline',
    children: [
      {
        title: 'Subir Plano',
        link: '/pages/uploadplane',
      },
      {
        title: 'Historial de planos',
        link: '/pages/planehistory',
      },
      {
        title: 'Aprobar planos',
        link: '/pages/approveplane',
      },{
        title: 'Estado de los planos',
        link: '/pages/planestate',
      },
      {
        title: 'Agregar Switches',
        link: '/pages/planeswitch',
      }
    ]
  },
  {
    title: 'Puertos',
    icon: 'settings-outline',
    children:[
      {
        title: 'Agregar puertos',
        link: '/pages/addport',
      },
      {
        title: 'Buscar puerto',
        link: '/pages/findport',
      },
      {
        title: 'Modificar puerto',
        link: '/pages/modifyport',
      },
    ]
  },
  {
    title: 'Edificio',
    icon: 'home-outline',
    children:[
    {
      title:'Agregar edificio',
      link:  '/pages/addbuilding',
    }
    ]
  },{
    title: 'Centro de cableado',
    icon: 'globe-outline',
    children:[
      {
        title: 'Agregar Centro de cableado',
        link: '/pages/addwiringcenter',
      }
    ]

  }
];
//menu para rol contratista
export const MENU_ITEMS_CONTRATISTA: NbMenuItem[] = [
  {
    title: 'Planos',
    icon: 'map-outline',
    children: [
      {
        title: 'Subir Planos',
        link: '/pages/uploadplane',
      },
      {
        title: 'Estado de los planos',
        link: '/pages/planestate',
      },
    ]
  },
];
//menu para rol mesa de servicios
export const MENU_ITEMS_MESA_DE_SERVICIOS: NbMenuItem[] = [
  {
    title: 'Puertos',
    icon: 'settings-outline',
    children:[
      {
        title: 'Buscar puertos',
        link: '/pages/findport',
      },
    ]
  },
];
