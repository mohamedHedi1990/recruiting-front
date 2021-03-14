import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsService} from "../../../services/utils.service";
import {PositionEvaluationCriteria} from "../../../models/PositionEvaluationCriteria.model";

@Component({
  selector: 'ngx-edit-job-weight',
  templateUrl: './edit-job-weight.component.html',
  styleUrls: ['./edit-job-weight.component.scss']
})
export class EditJobWeightComponent implements OnInit {

  @Output() cancelEvent=new EventEmitter();
  @Input() job ;
  @Output() saveEvent=new EventEmitter()
  criteriaList=[]

  constructor(private utilsService:UtilsService) { }

  ngOnInit(): void {
    if ( this.job.evaluationCriteriaList.length == 0) {
      this.getAllCriteria();
    }
  }

  cancel(){
    this.cancelEvent.emit();
  }

  save(){
    this.saveEvent.emit(this.job);
  }

  getAllCriteria() {
    const context = this;
    this.utilsService.get(UtilsService.API_EVALUATIONCRITERIA).subscribe(
      (response: any) => {
        this.criteriaList = response;
        this.criteriaList.forEach(criteria => {
          let jobEvaluationCriteria={
            "evaluationCriteria":criteria,
            "note":0
          }
          this.job.evaluationCriteriaList.push(jobEvaluationCriteria);
        });
      },
      (error) => {
        this.utilsService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des critère d'evaluation`,
        );
      },
    );
  }

}
