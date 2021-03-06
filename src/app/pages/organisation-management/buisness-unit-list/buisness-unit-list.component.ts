import { Component , OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BusinessUnit } from '../../../models/BusinessUnit.model';
import { Company } from '../../../models/Company.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { UtilsService } from '../../../services/utils.service';

@Component ({
  selector : 'ngx-buisness-unit-list',
  templateUrl : './buisness-unit-list.component.html',
  styleUrls : ['./buisness-unit-list.component.scss']
})
export class BuisnessUnitListComponent implements OnInit {
  showBuisnessUnitModal : boolean = false ;
  buisnessUnit : BusinessUnit = new BusinessUnit();
  buisnessUnitList: BusinessUnit[];
  companies: Company[];
  loading = false;
  displayDeleteBUWindow= false;
  titleHeader: string;
  constructor(private organisationManagementService : OrganisationManagementService ,
    private utilsService: UtilsService, private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.getAllBuisnessUnit();
  }

  hideBuisnessUnitWindow () {
    this.buisnessUnit = new BusinessUnit ();
    this.showBuisnessUnitModal = false;
    this.displayDeleteBUWindow = false;

  }

  addNewBuisnessUnit() {
    this.titleHeader = "Ajouter une nouvelle unité organisationelle";
    this.getAllCompanies();
  }

  saveNewBuisnessUnit (buinessUnit : BusinessUnit ) {
    this.organisationManagementService.post(OrganisationManagementService.API_BUSINESS_UNIT, buinessUnit).subscribe(response => {
      this.hideBuisnessUnitWindow();
      this.getAllBuisnessUnit();
      this.utilsService.showToast(
        "success",
        "Unité organisationelle ajoutée avec succés",
        `L'unité organisationelle ${buinessUnit.businessUnitLabel} a été ajoutée avec succés`
      );
    }, error => {
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors de l'ajout de la nouvelle unitée organisationelle`
      );
    });
  }

  getAllCompanies() {
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe(response => {
      this.companies = response;
      this.showBuisnessUnitModal = true;
    }, error => {
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement de la liste des sociétés`
      );
    });
  }

  editBuisnessUnit(bu: BusinessUnit) {
    this.titleHeader = "Modifier une unité organisationelle";
    this.buisnessUnit = bu;
    this.getAllCompanies();
 
  }

  deleteBuisnessUnit(bu: BusinessUnit) {
    this.titleHeader = "Supprimer une unité organisationelle";
    this.buisnessUnit = bu;
    this.displayDeleteBUWindow = true;

  }
  delBuisnessUnit() {
    this.organisationManagementService.delete(OrganisationManagementService.API_BUSINESS_UNIT + this.buisnessUnit.businessUnitId).subscribe(response => {
      this.hideBuisnessUnitWindow();
      this.getAllBuisnessUnit();
      if (response.MESSAGE === 'DELETED') {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle supprimée avec succés',
          `L'nité fonctionnelle''  ${this.buisnessUnit.businessUnitLabel} a été supprimée avec succcés`);

      } else if (response.MESSAGE === 'NOT_EMPTY') {
        this.organisationManagementService.showToast(
          "danger", "Unité fonctionnelle non vide",
          `Des unités reliées à l'unité fonctionnelle  ${this.buisnessUnit.businessUnitLabel} ont été trouvés. Merci de les supprimer  avant de supprimer cette unité.`
        );
      }
    }, error => {
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors de la suppression de l'unitée organisationelle`
      );
    });
  }
  

  getAllBuisnessUnit() {
    this.loading = true;
    this.organisationManagementService .get (OrganisationManagementService .API_BUSINESS_UNIT ).subscribe (response => {
      this.buisnessUnitList = response;
      this.loading = false;
    }, error => {
        this.loading = false;
        this.utilsService .showToast (
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement de la liste des unités organisationelles`
        );
    });
  }

  rowGroupMetadata: any;
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.buisnessUnitList) {
      for (let i = 0; i < this.buisnessUnitList.length; i++) {
        let rowData = this.buisnessUnitList[i];
        let companyLabel = rowData.company.companyLabel;

        if (i == 0) {
          this.rowGroupMetadata[companyLabel] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.buisnessUnitList[i - 1];
          let previousRowGroup = previousRowData.company.companyLabel;
          if (companyLabel === previousRowGroup)
            this.rowGroupMetadata[companyLabel].size++;
          else
            this.rowGroupMetadata[companyLabel] = { index: i, size: 1 };
        }
      }
    }
  }

}
