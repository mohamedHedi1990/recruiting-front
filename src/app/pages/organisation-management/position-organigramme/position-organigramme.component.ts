import { Component, OnInit } from '@angular/core';
import {OrganisationManagementModule} from "../organisation-management.module";
import {OrganisationManagementService} from "../../../services/organisation-management.service";

@Component({
  selector: 'ngx-position-organigramme',
  templateUrl: './position-organigramme.component.html',
  styleUrls: ['./position-organigramme.component.scss']
})
export class PositionOrganigrammeComponent implements OnInit {

  organirammes=[];
  nodes:any[]=[]

  constructor(private organisationService:OrganisationManagementService) { }

  ngOnInit(): void {
    this.getAllHierarchiralOrganigramme();
    /* this.nodes = [
      {
        name: 'Sundar Pichai',
        cssClass: 'ngx-org-ceo',
        image: '',
        title: 'Chief Executive Officer',
        childs: [
          {
            name: 'Thomas Kurian',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Cloud',
          },
          {
            name: 'Susan Wojcicki',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, YouTube',
            childs: [
              {
                name: 'Beau Avril',
                cssClass: 'ngx-org-head',
                image: 'assets/node.svg',
                title: 'Global Head of Business Operations',
                childs: []
              },
              {
                name: 'Tara Walpert Levy',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Agency and Brand Solutions',
                childs: []
              },
              {
                name: 'Ariel Bardin',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Product Management',
                childs: []
              }
            ]
          },
          {
            name: 'Jeff Dean',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Head of Artificial Intelligence',
            childs: [
              {
                name: 'David Feinberg',
                cssClass: 'ngx-org-ceo',
                image: 'assets/node.svg',
                title: 'CEO, Google Health',
                childs: []
              }
            ]
          }
        ]
      },
      {
        name: 'Sundar Pichai',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'Chief Executive Officer',
        childs: [
          {
            name: 'Thomas Kurian',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Cloud',
          },
          {
            name: 'Susan Wojcicki',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, YouTube',
            childs: [
              {
                name: 'Beau Avril',
                cssClass: 'ngx-org-head',
                image: 'assets/node.svg',
                title: 'Global Head of Business Operations',
                childs: []
              },
              {
                name: 'Tara Walpert Levy',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Agency and Brand Solutions',
                childs: []
              },
              {
                name: 'Ariel Bardin',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Product Management',
                childs: []
              }
            ]
          },
          {
            name: 'Jeff Dean',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Head of Artificial Intelligence',
            childs: [
              {
                name: 'David Feinberg',
                cssClass: 'ngx-org-ceo',
                image: 'assets/node.svg',
                title: 'CEO, Google Health',
                childs: []
              }
            ]
          }
        ]
      },
      {
        name: 'Sundar Pichai',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'Chief Executive Officer',
        childs: [
          {
            name: 'Thomas Kurian',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Cloud',
          },
          {
            name: 'Susan Wojcicki',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, YouTube',
            childs: [
              {
                name: 'Beau Avril',
                cssClass: 'ngx-org-head',
                image: 'assets/node.svg',
                title: 'Global Head of Business Operations',
                childs: []
              },
              {
                name: 'Tara Walpert Levy',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Agency and Brand Solutions',
                childs: []
              },
              {
                name: 'Ariel Bardin',
                cssClass: 'ngx-org-vp',
                image: 'assets/node.svg',
                title: 'VP, Product Management',
                childs: []
              }
            ]
          },
          {
            name: 'Jeff Dean',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Head of Artificial Intelligence',
            childs: [
              {
                name: 'David Feinberg',
                cssClass: 'ngx-org-ceo',
                image: 'assets/node.svg',
                title: 'CEO, Google Health',
                childs: []
              }
            ]
          }
        ]
      }
    ]; */
  }

  getAllHierarchiralOrganigramme(){
    this.organisationService.get(OrganisationManagementService.API_POSITION+"get-organiramme").subscribe((data:any)=>{
      this.organirammes=data;
    },(error)=>{
      this.organisationService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des organigrammes`);

    })

}

}
