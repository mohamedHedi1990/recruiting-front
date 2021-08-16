import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent implements OnInit {


  displayAddJob = false;
  displayDetailsJob = false;
  jobList = [];
  isAdmin: boolean = false;
  isRh: boolean = false;
  isCandidat: boolean = false;
  isTrainee: boolean = false;
  job = {
    "jobOffreId": null,
    "jobOffreLabel": "",
    "jobOffreDescription": "",
    "jobOffreDomaineActivite": null,
    "contractType": "",
    "stageOffreCompetences": "",
    "jobOffreSalaire": 0,
    "jobOffreDateDebut": this.datePipe.transform(new Date(), "dd-MM-yyyy"),
    "jobOffreDateFin": this.datePipe.transform(new Date(), "dd-MM-yyyy"),
    "jobStatus": "OPENED",
    "jobReference": "",
  }

  apiOffreFiltred: any;
  constructor(private utilsService: UtilsService, private datePipe: DatePipe,private router:ActivatedRoute) {
    this.job.jobOffreDateDebut = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.job.jobOffreDateFin = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    if (localStorage.getItem("userRole") === "ADMINISTRATOR") {
      this.isAdmin = true;
    }
    else
      if (localStorage.getItem("userRole") === "RH") {
        this.isRh = true;

      } else
        if (localStorage.getItem("userRole") === "CANDIDATE") {
          this.isCandidat = true;

        } else
          if (localStorage.getItem("userRole") === "TRAINEE") {
            this.isTrainee = true;
          }
    
    this.router.params.subscribe(params=>{
      console.log(params.domain);
      if(params!=null && params.domain!=null)
      {this.getAllJobsByDomain(params.domain);}
      else
      {this.getAllJobs();}
    });
  
  }

  ngOnInit(): void {
    
  }

  showAddJobWindow() {
    this.displayAddJob = true;
  }

  hideAddJobWindow() {
    this.getAllJobs();
    this.displayAddJob = false;
  }
  hideDetailsJobWindow() {
    this.getAllJobs();
    this.displayDetailsJob = false;
  }
  getAllJobs() {
    this.apiOffreFiltred = UtilsService.API_JOB;
    this.apiOffreFiltred = this.apiOffreFiltred + "/stages"
    this.utilsService.get(this.apiOffreFiltred).subscribe(
      (response) => {
        this.jobList = response;
        console.log("-----job lists----");
        console.log(this.jobList);
      },
      (error) => {
        this.utilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement des l'offre d'emplois`
        );
      }
    );
  }


  getAllJobsByDomain(idDomain) {
    this.apiOffreFiltred = UtilsService.API_JOB;
    this.apiOffreFiltred = this.apiOffreFiltred + "/stagesByDomain/"+idDomain
    this.utilsService.get(this.apiOffreFiltred).subscribe(
      (response) => {
        this.jobList = response;
        console.log("-----job lists----");
        console.log(this.jobList);
      },
      (error) => {
        this.utilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement des l'offre d'emplois`
        );
      }
    );
  }
  showPlus(job) {
    console.log("---show Plus----")
    this.job = job;
    this.displayDetailsJob = true;
  }
  cancelDetailsHandler() {
    console.log("--------handler event--------");
    this.displayDetailsJob = false;
    this.displayAddJob = true;

  }
}
