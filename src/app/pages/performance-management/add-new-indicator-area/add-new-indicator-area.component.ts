import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lab } from 'd3-color';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-add-new-indicator-area',
  templateUrl: './add-new-indicator-area.component.html',
  styleUrls: ['./add-new-indicator-area.component.scss']
})

export class AddNewIndicatorAreaComponent implements OnInit {
@Input() area = {
    indicatorAreaId: null,
    indicatorAreaLabel:'',
    indicatorAreaCode: '',
    indicatorAreaDetails: '',
    nbrPerformanceIndicator : 0,
    performanceIndicators : []
  };
@Output() addNewIndicatorAreaEvent = new EventEmitter();
@Output() cancelEvent = new EventEmitter();
areas = [];
areas_edit = [];
indicatorTable =[];
datePipe;
id = 0;
line = {
  id : null,
  indicatorId : null ,
  indicatorName : '',
  indicatorSens : 'CROISSANT',
  indicatorType : 'QUALITATIF'
};
areaIndicators ;
headerTitle = "Ajouter des indicateurs au domaine";
checkInValidIndicators = false ;
constructor(private performanceManagementService: PerformanceManagementService) {}

ngOnInit(): void {
    if (this.area.indicatorAreaId == null) {
      this.area.indicatorAreaCode = '',
      this.area.indicatorAreaLabel = '';
      this.area.indicatorAreaDetails = '';
      this.area.performanceIndicators = [];
    } 
    else {
      this.getAreaIndicators(this.area);
      this.headerTitle = "Modifier la liste des indicateurs du domaine";
    }
    
    this.initiateLine();
}
getAreaIndicators(area){
    this.performanceManagementService.getAll(this.performanceManagementService.API_INDICATOR_AREA +area.indicatorAreaId+'/performance-indicators').subscribe(
      response => {
        this.area.performanceIndicators = response;
      },
      error => {
        this.performanceManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des indicateurs`);
      });
}

addNewPerformanceIndicator() {
  let context = this;
  context.area.performanceIndicators.push({
    indicatorName : '',
    indicatorSens : 'CROISSANT',
    indicatorType : 'QUALITATIF'
  });
}
checkAreaValid (): boolean {
  return this.area.indicatorAreaCode == null || this.area.indicatorAreaCode === '' ||
  this.area.indicatorAreaLabel == null || this.area.indicatorAreaLabel === '' ;
}
  saveArea() {
    this.addNewIndicatorAreaEvent.emit(this.area);
  }

 

onKeyUp(x) { 
  let label : string= x.target.value
  label = label.replace(/ /g, '-');
  let code = label.toLocaleUpperCase();
  this.area.indicatorAreaCode = code ; 
 
} 
initiateLine() {
  this.line = {
    id :null,
    indicatorId : null , 
    indicatorName : '',
  indicatorSens : 'CROISSANT',
  indicatorType : 'QUALITATIF'
  }; 
}
checkIndicatorValid(): boolean {
  return this.line.indicatorName ==""|| this.line.indicatorName == null
}
addLine() { 

    this.line.id = this.id ;
    this.area.performanceIndicators.push(this.line);
    this.initiateLine();
    this.id +=1;
}

cancel() {this.cancelEvent.emit(); }
deleteLine(line) {
  if(line.indicatorId != null){
    this.performanceManagementService.delete(this.performanceManagementService.API_PERFORMANCE_INDICATOR +line.indicatorId).subscribe(
      response => {},
      error => { console.log(error); });
  }
  for(let i=0; i<this.area.performanceIndicators.length ; i++) {
    const element = this.area.performanceIndicators[i];
    if(element.id != null && element.id === line.id) {
      this.area.performanceIndicators.splice(i, 1);
      break;
    }
    if(element.indicatorId!= null && element.indicatorId === line.indicatorId) {
      this.area.performanceIndicators.splice(i, 1);
      break;
    }
  }
}
validIndicator()  {
  
  this.area.performanceIndicators.forEach(element => {
    if(element.indicatorName == null || element.indicatorName == "" ){
        this.checkInValidIndicators = true
    }
  });
}
}



