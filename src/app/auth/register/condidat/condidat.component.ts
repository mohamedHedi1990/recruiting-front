import { Router } from '@angular/router';
import { JwtResponse } from './../../../models/JwtResponse.model';
import { AuthServiceService } from './../../../services/auth/auth-service.service';
import { FiliereService } from './../../../services/filiere.service';
import { Filiere } from './../../../models/filiere';
import { User } from './../../../models/user';
import { Condidat } from './../../../models/condidat';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-condidat',
  templateUrl: './condidat.component.html',
  styleUrls: ['./condidat.component.scss']
})
export class CondidatComponent implements OnInit {
  condidat: Condidat = new Condidat()
  user: User = new User()
  filiere: Filiere = new Filiere()
  sections:any=[]
  @Input() role: string=''
  @Output() registerr = new EventEmitter();
  section: any = '1'
  constructor(
    private router:Router,
    private serviceAuth:AuthServiceService,
    private filiereService:FiliereService
  ) { }

  ngOnInit(): void {
    this.getAllFilieres()
  }
  register() {
    console.log(this.role);
    var body={}



       body =
      {
        userFirstName: this.user.userFirstName,
        userLastName: this.user.userLastName,
        userLogin: this.user.userLogin,
        userPassword: this.user.userPassword,
        userBirthDate: this.user.userBirthDate,
        userBirthCountry: this.user.userBirthCountry,
        userBirthCity: this.user.userBirthCity,
        userNRue: this.user.userNRue,
        userPays: this.user.userPays,
        userCity: this.user.userCity,
        userGender: this.user.userGender,
        userCivilStatus: this.user.userCivilStatus,
        userAddress: this.user.userAddress,
        userEmail: this.user.userEmail,
        userPhoneNumber: this.user.userPhoneNumber,
        candidatDiplome: this.condidat.candidatDiplome,
        candidatAnneeDiplome: this.condidat.candidatAnneeDiplome,
        candidatNumberExperience: this.condidat.candidatNumberExperience,
        candidatFiliere: {
          domaineId: this.filiere.domaineId,

        }
      }

    console.log(body);

    this.serviceAuth.register( this.role,body).subscribe(
      (data: any) => {
        this.router.navigateByUrl("/recruiting");

      },
      (error) => {
        console.log("error");

      }
    )
  }
  checkCondidatValid(): boolean {
    return this.condidat.candidatDiplome === '' || this.condidat.candidatAnneeDiplome === '' ||
      this.condidat.candidatNumberExperience == null;
  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section = event.target.id
  }
  getAllFilieres(){
    this.filiereService.getAllFilieres().subscribe(arg => this.sections = arg);

  }

}
