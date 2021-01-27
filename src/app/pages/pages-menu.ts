import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/zen-people-referential/dashboard',
    home: true,
  },
  {
    title: 'Administration',
    icon: 'settings-2-outline',
    link: '/zen-people-referential/administration/users-list',
    /*children: [
      
    ],*/
    
  },
  {
    title: 'Organisation',
    icon: 'keypad-outline',
    /*children: [
      
    ],*/
    
  },
  {
    title: 'Compétences',
    icon: 'award-outline',
    children: [
      {
        title: 'Famille des compétences',
        link: '/zen-people-referential/skills/skills-group',
        icon: 'briefcase-outline',
      },
      {
        title: 'Gestion des compétences',
        link: '/zen-people-referential/skills/skills-management',
        icon: 'file-text-outline',
      },
    ],
    
  },
  {
    title: 'Indicateurs de performance',
    icon: 'trending-up-outline',
    children: [
      {
        title: 'Domaines des indicateurs',
        link: '/zen-people-referential/performance/indicator-group',
        icon: 'briefcase-outline',
      },
      {
        title: 'Gestion des indicateurs',
        link: '/zen-people-referential/performance/indicator-management',
        icon: 'file-text-outline',
      },
    ],
    
  },
  {
    title: 'Evaluation des performances',
    icon: 'checkmark-square-outline',
    /*children: [
     
    ],*/
    
  },
  /*{
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Fichier',
    group: true,
  },*/
  /*{
    title: 'Fichier',
    icon: 'file-outline',
    children: [
      {
        title: 'Sociétés',
        link: '/pages/fichier/societes',
        icon: 'briefcase-outline',
      },
      {
        title: 'Clients',
        link: '/pages/fichier/clients',
        icon: 'award-outline',
      },
      {
        title: 'Fournisseurs',
        link: '/pages/fichier/fournisseurs',
        icon: 'car-outline',
      },
      {
        title: 'Comptes bancaires',
        link: '/pages/fichier/comptes',
        icon: 'activity-outline',
      },
      {
        title: 'echeanciers',
        link: '/pages/fichier/echeanciers',
        icon: 'calendar-outline',
      },
      {
        title: 'tarifs-bancaires',
        link: '/pages/fichier/tarifs-bancaires',
        icon: 'percent-outline',
      },
    ],
  },
  {
    title: 'Factures',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Factures clients',
        link: '/pages/factures/factures-clients',
		icon: 'file-outline',
      },
      {
        title: 'Factures fournisseurs',
        link: '/pages/factures/factures-fournisseurs',
		icon: 'file-outline',
      },
    ],
  },
  {
    title: 'Saisie tresorerie',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Règlements Clients',
        link: '/pages/saisie-tresorerie/reglement-client',
        icon: 'keypad-outline',
      },
      {
        title: 'Paiements Fournisseurs',
        link: '/pages/saisie-tresorerie/paiement-fournisseur',
        icon: 'keypad-outline',
      },
      {
        title: 'Encaissements',
        link: '/pages/saisie-tresorerie/encaissements',
        icon: 'keypad-outline',
      },
      {
        title: 'Décaissements',
        link: '/pages/saisie-tresorerie/decaissements',
        icon: 'keypad-outline',
      },
    ],
  },
  {
    title: 'Rapprochement',
    icon: 'browser-outline',
    children: [
      {
        title: 'Rapprochement bancaire',
        link: '/pages/suivi-tresorerie/rapprochement-bancaire',
        icon: 'browser-outline',
      },
      
    ],
  },
  {
    title: 'Simulation de tresorerie',
    icon: 'browser-outline',
    children: [
      {
        title: 'Etat engagé',
        link: '/pages/suivi-tresorerie/etat-engage',
        icon: 'browser-outline',
      },
      
    ],
  },*/
  
];
