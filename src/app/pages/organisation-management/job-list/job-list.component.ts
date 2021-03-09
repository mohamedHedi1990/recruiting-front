import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../../services/utils.service";
import {OrganisationManagementService} from "../../../services/organisation-management.service";

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  job = null;
  jobList = [];
  loading = false;

  titleHeader: any;
  displayDeleteJob:boolean=false;

  constructor(private organisationService: OrganisationManagementService) { }


  ngOnInit(): void {
    this.getAllJobs();
    this.initJob();
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

  initJob() {
    this.job = {
      jobId: null,
      jobLabel: null,
      jobCode: null,
    };
  }
  checkJobValid(): boolean {
    return (
      this.job.jobLabel === "" || this.job.jobLabel == null
    );
  }


  deleteJob(rowdata) {
    this.displayDeleteJob=true;
    this.job = rowdata;
  }
  delJob()
  {
    this.organisationService.delete(
      OrganisationManagementService.API_JOB+this.job.jobId,
    ).subscribe(
      (response) => {
        this.organisationService.showToast('success',
          'Métier supprimé avec succés',
          `le métier ${this.job.jobLabel} a été supprimé avec succcés`);
        this.getAllJobs();
        this.displayDeleteJob=false;
      },
      (error) => {
        this.organisationService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression du métier ${this.job.jobLabel}`
        );
        this.getAllJobs();
      }
    );
  }


  editJob(job){
    const context = this;
    this.organisationService.post(OrganisationManagementService.API_JOB,job)
      .subscribe((data)=>{
        this.organisationService.showToast(
          "success",
          "Métier modifié avec succès",
          `Le métier ${job.jobLabel} a été modifié avec succès`
        );
        this.initJob();
        this.getAllJobs();
      },
        (error) => {
          this.organisationService.showToast(
            "danger",
            "Erreur interne",
            `Un erreur interne a été produit lors de modification du métier ${job.jobLabel}`
          );
          this.initJob();
        }
      )
  }



  saveNewJob() {
    this.organisationService.post(OrganisationManagementService.API_JOB,this.job)
      .subscribe((data)=>{
      this.organisationService.showToast(
        "success",
        "Métier ajouté avec succès",
        `Le métier ${this.job.jobLabel} a été ajouté avec succès`
      );
      this.initJob();
      this.getAllJobs();
    },
    (error) => {
      this.organisationService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors de l'ajout du métier ${this.job.jobLabel}`
      );
      this.initJob();
    }
  )
  }


}
