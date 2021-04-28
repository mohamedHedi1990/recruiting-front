import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/recruiting/dashboard',
    home: true,
  },
  {
    title: 'Liste des annonces',
    icon: 'people-outline',
    children: [
      {
        title: 'Stages',
        link: '/recruiting/administration/job-list',
        icon: 'layers-outline',
      },
      {
        title: 'Emploies',
        link: '/recruiting/administration/job-list',
        icon: 'layers-outline',
      },
     

    ],

  },
  /*{
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
      {
        title: 'Liste des offres',
        link: '/recruiting/administration/job-list',
        icon: 'people-outline',
      },
      
    ],

  },*/
  

];
