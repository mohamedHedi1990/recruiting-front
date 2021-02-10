import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-add-new-indicator-performance',
  templateUrl: './add-new-indicator-performance.component.html',
  styleUrls: ['./add-new-indicator-performance.component.scss']
})
export class AddNewIndicatorPerformanceComponent implements OnInit, OnChanges {
  @Input() performanceIndicator ;
  @Output() addNewIndicatorEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  areas : [];
  lineValid = true;
  scale ={
    indicatorScaleLabel: '',
    indicatorScaleValue: null
  }
  checkInValidScales = false;
  ListScale ;
 
  Liste_default_scale = [
    {
      id : 0 ,
      indicatorScaleLabel: 'Inférieure à l’objectif',
      indicatorScaleValue: 50
    },
    {
      id : 1 ,
      indicatorScaleLabel: 'Proche de l’objectif',
      indicatorScaleValue: 75
    },
    {
      id : 2 ,
      indicatorScaleLabel: 'Conforme à l’objectif',
      indicatorScaleValue: 100
    },
    {
      id : 3 ,
      indicatorScaleLabel: 'Dépasse l’objectif',
      indicatorScaleValue: 120
    }
  ];
  line = {
    id : null,
    indicatorScaleId : null,
    indicatorScaleLabel : '',
    indicatorScaleValue : null
  };
  id= 4;

  constructor(private performanceManagementService: PerformanceManagementService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) {
     
     }
  ngOnChanges(changes: SimpleChanges): void {
    this.ListScale = this.Liste_default_scale;
    this.sortTable(this.ListScale , '');
    if(this.performanceIndicator.indicatorScales.length >0){
      this.ListScale = this.performanceIndicator.indicatorScales;
      this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);
    }
    this.validScale(); 
    this.getAllAreas();  
  }


  ngOnInit(): void {
    
    this.ListScale = this.Liste_default_scale;
      if(this.performanceIndicator.indicatorScales.length >0){
        this.ListScale = this.performanceIndicator.indicatorScales;
        this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);

      }
    this.getAllAreas();  
  }
  
  getAllAreas() {
    this.performanceManagementService.getAll(this.performanceManagementService.API_INDICATOR_AREA).subscribe(
      response => {this.areas = response; },
      error => {
        this.performanceManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des groupes des indicateurs`);
      });
      
  }

  saveIndicator() {
    if(this.performanceIndicator.indicatorType == "QUALITATIF"){
      this.performanceIndicator.indicatorScales = this.ListScale;
      this.performanceIndicator.indicatorFormula = null ;
    }else{
      this.performanceIndicator.indicatorScales = [];
    }

    this.addNewIndicatorEvent.emit(this.performanceIndicator);
  }

  cancel() {this.cancelEvent.emit();}

  checkIndicatorValid(): boolean {
    return this.performanceIndicator.indicatorName == null || this.performanceIndicator.indicatorName === '' ||
    this.performanceIndicator.indicatorArea == null ;
  }
 
  checkScaleValid(){
    return this.line.indicatorScaleLabel == null || this.line.indicatorScaleLabel == "" ||
    this.line.indicatorScaleValue == null   ;
  }

  initiateLine() {
    this.line = {
      id : null,
      indicatorScaleId : null,
      indicatorScaleLabel : '',
      indicatorScaleValue : null
     }; 
  }
  addLine() { 
    if(this.line.indicatorScaleLabel !=''|| this.line.indicatorScaleLabel != null ||
      this.line.indicatorScaleValue != null){
        this.line.id = this.id ;
        this.ListScale.push(this.line);
        this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);

        this.initiateLine();
        this.id +=1;
    }
  }

  deleteLine(line) {
    
      if(line.indicatorScaleId!= null ) {
        
        this.performanceManagementService.delete(this.performanceManagementService.API_SCALE_INDICATOR +line.indicatorScaleId).subscribe(
          response => {

            for(let i=0; i<this.ListScale.length ; i++) {
              const element = this.ListScale[i];
              if(element.indicatorScaleId != null && element.indicatorScaleId === line.indicatorScaleId) {
                this.ListScale.splice(i, 1);
                this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);
                break;
              }
             
            }
            
            
          },
          error => { console.log(error); });
      }else{
        for(let i=0; i<this.ListScale.length ; i++) {
          const element = this.ListScale[i];
          if(element.id != null && element.id === line.id) {
            this.ListScale.splice(i, 1);
            this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);

            console.log('o2',this.ListScale)
            break;
          }
      }
    }
    
  }
  compareArea(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.indicatorAreaId === b.indicatorAreaId;
  }
  validScale()  {
    this.checkInValidScales = false ;
    this.ListScale.forEach(element => {
      if(element.indicatorScaleLabel == null || element.indicatorScaleLabel == "" ||
      element.indicatorScaleValue == null){
          this.checkInValidScales = true;
      } 
    });
    this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);

   
  }

  changeSens(){
    this.sortTable(this.ListScale , this.performanceIndicator.indicatorSens);
  }
  
  sortTable(table , type){
    table.sort(function(a, b) {
      return a.indicatorScaleValue - b.indicatorScaleValue;
    });
    if(type == 'DECROISSANT'){
      table =table.reverse();
    }
  }
}
