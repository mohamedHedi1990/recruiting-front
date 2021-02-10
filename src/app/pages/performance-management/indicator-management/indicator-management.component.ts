import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-indicator-management',
  templateUrl: './indicator-management.component.html',
  styleUrls: ['./indicator-management.component.scss']
})
export class IndicatorManagementComponent implements OnInit {

  displayIndicatorModal = false;
  displayDeleteIndicator = false ;
  indicators = [];
  HeaderIndicator="";
  loading = false;
  indicator = null;
  indicatorUpdate: any;
  isUpdate = false;
  titleHeader: any;
  
  form:any=null;
  selectedFile:any=null;
  showImportButton=false;

  constructor(
    private performanceManagementService: PerformanceManagementService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initIndicator();
    this.getAllIndicators();
  }
  selectFile(event,form){
    this.selectedFile=event.files[0];
    this.form=form;
    this.showImportButton=true;
  }

  clear(event){
    this.form.clear();
    this.showImportButton=false;
  }
  
  importer(){
    const context = this;
    let formData = new FormData()
    formData.append('file', this.selectedFile)
    this.performanceManagementService.post(this.performanceManagementService.API_INDICATOR_AREA+"/import",formData).subscribe( 
      (response) => {
        this.performanceManagementService.showToast('success',
          response.MESSAGE,
          `Les indicateurs ont été enregistrée avec succcés`);
      context.initIndicator()
      context.getAllIndicators();
    }, (error) => {
      this.performanceManagementService.showToast('danger',
      error.MESSAGE,
      ``);
    })
  }

  getAllIndicators() {
    const context = this;
    this.performanceManagementService.getAll(this.performanceManagementService.API_PERFORMANCE_INDICATOR).subscribe(response => {
      context.indicators = response;
    },
      error => {
        console.log(error)
        this.performanceManagementService.showToast('danger',
          'Erreur  interne',
          `Un erreur interne a été produit lors du chargement des indicateurs`);
      });
      
  }
  saveIndicator(indicator) {
    //if(indicator.indicatorId == null){
      if(indicator.indicatorId != null) {
        delete indicator.createdAt;
        delete indicator.updatedAt;
        delete indicator.indicatorArea.createdAt;
        delete indicator.indicatorArea.updatedAt;

        if(indicator.indicatorScales != null && indicator.indicatorScales.length === 0) {
          indicator.indicatorScales.forEach(element => {
            delete element.createdAt;
        delete element.updatedAt;
          });
        }
      }

      this.performanceManagementService.post(this.performanceManagementService.API_PERFORMANCE_INDICATOR, indicator).subscribe(
        response => {
          this.displayIndicatorModal = false ;
          this.getAllIndicators(); 
          if(indicator.indicatorId){
          this.performanceManagementService.showToast('success',
          'Indicateur modifié avec succés',
          `L'ndicateur  ${indicator.indicatorName} a été modifié avec succcés`);
          }else{
            this.performanceManagementService.showToast('success',
          'Indicateur ajouté avec succés',
          `L'ndicateur  ${indicator.indicatorName} a été ajouté avec succcés`);
       
       

          }
        },
        error => {
          this.performanceManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de l'ajout de l'indicateur ${this.indicator.indicatorName}`);
          this.displayIndicatorModal = false;
        });
    /*}else{
      
      this.performanceManagementService.put(this.performanceManagementService.API_PERFORMANCE_INDICATOR, indicator).subscribe(
        response => {
          this.displayIndicatorModal = false ;
          this.getAllIndicators();
          this.performanceManagementService.showToast('success',
          'Indicateur modifiée avec succés',
          `L'ndicateur  ${indicator.indicatorName} a été modifiée avec succcés`);
       
        },
        error => {
          console.log('error', error)
          this.performanceManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de la modification de l'indicateur ${this.indicator.indicatorName}`);
          this.displayIndicatorModal = false;
        });
    }*/
    
  }
  
 
  addIndicator(){
    this.displayIndicatorModal = true;
    this.HeaderIndicator = "Ajouter un indicateur"
  }
  editIndicator(indicator){
    this.indicator = indicator;
    console.log('indicator to edit',this.indicator)
    this.displayIndicatorModal = true;
    this.HeaderIndicator = "Modifier un indicateur"

  }
  hideIndicatorWindow() {
    this.displayIndicatorModal = false;
  }
 
  deleteIndicator(){
    const context = this;
    this.performanceManagementService.delete(this.performanceManagementService.API_PERFORMANCE_INDICATOR + this.indicator.indicatorId).subscribe(response => {

        this.performanceManagementService.showToast('success',
          'Indicateur supprimé avec succés',
          `L'indicateur' ${this.indicator.indicatorName} a été supprimé avec succés`);
        this.displayDeleteIndicator = false;
        context.getAllIndicators();
        this.initIndicator();
    },
      error => {
          this.performanceManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors de la suppression de l'indicateur ${this.indicator.indicatorName}`);
          this.displayDeleteIndicator = false;
          this.initIndicator();
      });
  }

delIndicator(indicator){
  this.indicator = indicator ;
  this.displayDeleteIndicator =true;
}
  
  



  initIndicator() {
    this.indicator= {
      indicatorId: null,
      indicatorName : '',
      indicatorSens : 'CROISSANT',
      indicatorFormula : '',
      indicatorEvaluation : 'COLLECTIF',
      indicatorType : 'QUALITATIF',
      indicatorArea : null,
      indicatorScales : [],
      updatedAt : null,
      createdAt : null

    };
  }


}