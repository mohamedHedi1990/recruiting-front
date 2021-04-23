import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/recruiting/dashboard',
    home: true,
  },
  {
    title: 'Utilisateurs',
    icon: 'people-outline',
    children: [
      {
        title: 'Profil',
        link: '/recruiting/administration/profil',
        icon: 'people-outline',
      },
      {
        title: 'Employés RH',
        link: '/recruiting/administration/users-list',
        icon: 'people-outline',
      },
      
    ],

  },
  

];
