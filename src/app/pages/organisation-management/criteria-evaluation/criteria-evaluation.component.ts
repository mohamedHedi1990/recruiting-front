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
  scale={
    "ratingScaleLabel":"",
    "ratingScaleValueMin":0,
    "ratingScaleValueMax":0
  }
  titleHeader: any;
  displayDeleteCriteria:boolean=false;
  totalPonderation:any;
  maxPonderation:Boolean=false;
  notMaxPonderation:Boolean=false;
  constructor(private UtilsService: UtilsService) { }


  ngOnInit(): void {
    
    this.getAllCriteria();
    this.initCriteria();
    this.displayDeleteCriteria=false;
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

    this.UtilsService.get(UtilsService.API_EVALUATIONCRITERIA+"/get_total_pondering")
    .subscribe((data)=>{
      this.totalPonderation=data;
      if(this.totalPonderation<100)
      {
         this.notMaxPonderation=true;
      } else
      {
        this.notMaxPonderation=false;
      }
    });
  }

  initCriteria() {
    this.criteria = {
      evaluationCriteriaId: null,
      evaluationCriteriaLabel: null,
      evaluationCriteriaCode: null,
      evaluationCriteriaPondering:0,
    };
  }
  checkCriteriaValid(): boolean {
    return (
      this.criteria.evaluationCriteriaLabel === "" || this.criteria.evaluationCriteriaLabel == null 
    );
  }
 

  deleteCriteria(rowdata) {
    this.displayDeleteCriteria=true;
    this.criteria = rowdata;
    console.log("----delete criteria----")
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
      this.UtilsService.get(UtilsService.API_EVALUATIONCRITERIA+"/get_total_pondering_without_current_criteria/"+criteria.evaluationCriteriaId)
      .subscribe((data)=>{
        this.totalPonderation=data;
        if(this.totalPonderation+criteria.evaluationCriteriaPondering<=100)
        {
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
        else
        {
          context.initCriteria();
          context.getAllCriteria();
           this.maxPonderation=true;
           this.initMessage();

        }
      })
      
    }
  
  

  saveNewCriteria() {
    const context = this;

    this.UtilsService.get(UtilsService.API_EVALUATIONCRITERIA+"/get_total_pondering")
    .subscribe((data)=>{
      this.totalPonderation=data;
      if(this.totalPonderation+this.criteria.evaluationCriteriaPondering<=100)
      {
        this.criteria.evaluationCriteriaPondering=100-this.totalPonderation;
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
      else{
        context.initCriteria();
        context.getAllCriteria();
         this.maxPonderation=true;
         this.initMessage();
      }
    }
    );
    
  }

  initScale(){
    this.scale={
      "ratingScaleLabel":"",
      "ratingScaleValueMin":0,
      "ratingScaleValueMax":0
    }
  }

  checkValidScale(){
    return (
      this.scale.ratingScaleLabel === "" || this.scale.ratingScaleValueMax < this.scale.ratingScaleValueMin 
    );
  }



     saveNewScaleFromExpand(criteria,scale){
       let newscale={
        "ratingScaleLabel":"",
        "ratingScaleValueMin":0,
        "ratingScaleValueMax":0
      };
       newscale=Object.assign(newscale, scale);
       if(!criteria.ratingScales) {
        criteria.ratingScales = [];
       }
        criteria.ratingScales.push(newscale);
        const context = this;
          this.UtilsService.post(
            UtilsService.API_EVALUATIONCRITERIA,
            criteria
          ).subscribe(
            (response) => {
              criteria=response;
              this.initScale();
              scale={
                "ratingScaleLabel":"",
                "ratingScaleValueMin":0,
                "ratingScaleValueMax":0
              };
            },
            (error) => {
            
            }
          );
    }
  
    deleteScaleFromExpend(criteria,scale,rowIndex){
  
      if(scale.ratingScaleId != null){
    
          this.UtilsService.delete(
            UtilsService.API_RATINGSCALE+"/"+scale.ratingScaleId,
          ).subscribe(
            (response) => {
              criteria.ratingScales.splice(rowIndex,1)
            },
            (error) => {
              this.UtilsService.showToast(
                "danger",
                "Erreur interne",
                `Un erreur interne a été produit lors de la suppression du critère d'évaluation ${this.criteria.evaluationCriteriaLabel}`
              );
  
            }
          );
        }else{
          criteria.ratingScales.splice(rowIndex,1)
        }
      }
      initMessage()
      {
      setTimeout(() => {
        this.maxPonderation=false;
        }, 5000);
      }
}
