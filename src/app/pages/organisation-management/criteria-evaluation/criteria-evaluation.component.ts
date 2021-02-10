import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-criteria-evaluation',
  templateUrl: './criteria-evaluation.component.html',
  styleUrls: ['./criteria-evaluation.component.scss']
})
export class CriteriaEvaluationComponent implements OnInit {

  criteria = null;
  criteriaList = [];
  rowcriteria = null;
  loading = false;
  titleHeader: any;
  displayDeleteCriteria=false;

  constructor(private UtilsService: UtilsService) { }


  ngOnInit(): void {
    this.getAllCriteria();
    this.initCriteria();
  }


  getAllCriteria() {
    const context = this;
    this.UtilsService.get(UtilsService.API_EVALUATIONCRITERIA).subscribe(
      (response:any) => {
        context.criteriaList = response;
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement de la liste des critère d'evaluation`
        );
      }
    );
  }

  initCriteria() {
    this.criteria = {
      evaluationCriteriaId: null,
      evaluationCriteriaLabel: null,
      evaluationCriteriaCode: null,
      evaluationCriteriaStatus: null,
    };
  }
  checkCriteriaValid(): boolean {
    return (
      this.criteria.evaluationCriteriaLabel === "" || this.criteria.evaluationCriteriaLabel == null 
    );
  }
 

  deleteCriteria(rowdata) {
    this.criteria = rowdata;
    this.displayDeleteCriteria=true;

  }
  delCriteria()
  {
    const context = this;
    this.UtilsService.delete(
      UtilsService.API_EVALUATIONCRITERIA+"/"+this.criteria.evaluationCriteriaId,
    ).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
        'Critère d\'évaluation supprimé avec succés',
        `le Critère d'évaluation ${this.criteria.evaluationCriteriaLabel} a été supprimé avec succcés`);
        context.displayDeleteCriteria = false;
        context.initCriteria();
        context.getAllCriteria();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression du critère d'évaluation ${this.criteria.evaluationCriteriaLabel}`
        );
        context.displayDeleteCriteria = false;
        context.initCriteria();
        context.getAllCriteria();
      }
    );
  }
  editCriteria(criteria){
      const context = this;
      this.UtilsService.post(
        UtilsService.API_EVALUATIONCRITERIA,
        criteria
      ).subscribe(
        (response) => {
          this.UtilsService.showToast(
            "success",
            "Critère d'évaluation modifié avec succès",
            `Le critère d'évaluation ${criteria.evaluationCriteriaLabel} été modifié avec succès`
          );
          context.initCriteria();
          context.getAllCriteria();
        },
        (error) => {
          this.UtilsService.showToast(
            "danger",
            "Erreur interne",
            `Un erreur interne a été produit lors de la modification du critère d'évaluation ${this.criteria.evaluationCriteriaLabel}`
          );
          context.initCriteria();
        }
      );
    }
  
  

  saveNewCriteria() {
    const context = this;
    this.UtilsService.post(
      UtilsService.API_EVALUATIONCRITERIA,
      this.criteria
    ).subscribe(
      (response) => {
        this.UtilsService.showToast(
          "success",
          "Critère ajouté avec succès",
          `Le critère d'évaluation ${this.criteria.evaluationCriteriaLabel} a été ajouté avec succès`
        );
        context.initCriteria();
        context.getAllCriteria();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de l'ajout du crière d'évaluation ${this.criteria.evaluationCriteriaLabel}`
        );
        context.initCriteria();
      }
    );
  }


}
