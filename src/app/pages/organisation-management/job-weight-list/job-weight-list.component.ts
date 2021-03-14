import {Component, Input, OnInit} from '@angular/core';
import {OrganisationManagementService} from "../../../services/organisation-management.service";

@Component({
  selector: 'ngx-job-weight-list',
  templateUrl: './job-weight-list.component.html',
  styleUrls: ['./job-weight-list.component.scss']
})
export class JobWeightListComponent implements OnInit {

  job;
  jobList = [];
  loading = false;

  titleHeader: any;
  displayEditJob:boolean=false;

  constructor(private organisationService: OrganisationManagementService) { }


  ngOnInit(): void {
    this.getAllJobs();
  }


  getAllJobs() {
    const context = this;
    this.organisationService.get(OrganisationManagementService.API_JOB).subscribe(
      (response:any) => {
        context.jobList = response;
      },
      (error) => {
        this.organisationService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement de la liste des métiers`
        );
      }
    );
  }

  editJob(job){
    this.job=job;
    this.displayEditJob=true;
  }

  cancelEdit(){
    this.displayEditJob=false;
  }

  saveJob(job){
    job.evaluationCriteriaList.forEach(elm =>{
      delete elm.job;
    });
    this.organisationService.post(OrganisationManagementService.API_JOB,job)
      .subscribe((data)=>{
          this.organisationService.showToast(
            "success",
            "Poid du métier modifié avec succès",
            `Le poit du métier ${job.jobLabel} a été modifié avec succès`
          );
          this.getAllJobs();
          this.displayEditJob=false;
        },
        (error) => {
          this.organisationService.showToast(
            "danger",
            "Erreur interne",
            `Un erreur interne a été produit lors de modification du poid du métier ${job.jobLabel}`
          );
        }
      )
  }
}
