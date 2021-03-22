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
    children: [
      {
        title: 'Utilisateurs',
        link: '/zen-people-referential/administration/users-list',
        icon: 'people-outline',
      },
      {
        title: 'Groupes d\'utilisateurs',
        link: '/zen-people-referential/administration/list-groups',
        icon: 'radio-button-on-outline',

      },
    ],

  },
  {
    title: 'Organisation',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Sociétés',
        link: '/zen-people-referential/organisation/companies',
        icon: 'home-outline',
      },
      {
        title: 'Unités organisationnelles',
        link: '/zen-people-referential/organisation/business-units',
        icon: 'shuffle-outline',
      },
      {
        title: "Métiers",
        link: '/zen-people-referential/organisation/job-list',
        icon: 'briefcase-outline',
      },


      {
        title: "Positions",
        link: '/zen-people-referential/organisation/positions',
        icon: 'briefcase-outline',
      },
      {
        title: "Organigrammes",
        link: '/zen-people-referential/organisation/position-organigramme',
        icon: 'layers-outline',
      },

    ],
  },
  {
    title: 'Gestion des Positions',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Missions',
        link: '/zen-people-referential/positions/missions-list',
        icon: 'briefcase-outline',
      },
     

      

    ],
  },
  {
    title: 'Catégorisation des métiers',
    icon: 'grid-outline',
    children: [
      {
        title: "Critères d'évaluation",
        link: '/zen-people-referential/organisation/evaluation-criteria',
        icon: 'flip-outline',
      },
      {
        title: "Poids de métiers",
        link: '/zen-people-referential/organisation/job-weight-list',
        icon: 'compass-outline',
      },
      {
        title: 'Catégories des métiers',
        link: '/zen-people-referential/organisation/categories',
        icon: 'radio-button-on-outline',

      },
    ],
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
        icon: 'award-outline',
      },
      {
        title: "Affectation",
        link: '/zen-people-referential/skills/add-skill-to-position',
        icon: 'checkmark-square-outline',
      },
      {
        title: "Matrice des compétences",
        link: '/zen-people-referential/skills/skills-referential',
        icon: 'award-outline',
      },
    ],

  },
  {
    title: 'Indicateurs de performance',
    icon: 'bar-chart-outline',
    children: [
      {
        title: 'Domaines des indicateurs',
        link: '/zen-people-referential/performance/indicator-group',
        icon: 'briefcase-outline',
      },
      {
        title: 'Gestion des indicateurs',
        link: '/zen-people-referential/performance/indicator-management',
        icon: 'bar-chart-outline',
      },

      {
      title: 'Affectation',
      icon: 'checkmark-square-outline',
      children: [
        {
          title: 'Qualitatifs',
          link: '/zen-people-referential/organisation/position-indicator-qualitatif',
          icon: 'radio-button-off-outline',
        },
        {
          title: 'Quantitatifs',
          link: '/zen-people-referential/organisation/position-indicator-quantitatif',
          icon: 'radio-button-off-outline',
        },]
      }
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
