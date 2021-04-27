import { Router } from '@angular/router';
import { AuthServiceService } from './../../../services/auth/auth-service.service';
import { Filiere } from './../../../models/filiere';
import { Stagiaire } from './../../../models/stagiaire';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'ngx-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss']
})
export class StagiaireComponent implements OnInit {
  stagiaire: Stagiaire = new Stagiaire()
  user: User = new User()
  filiere: Filiere = new Filiere()
section:string='1'
role:string=''
  constructor(
    private router:Router,
    private serviceAuth:AuthServiceService
  ) { }

  ngOnInit(): void {
  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);

    // this.section.next( event.target.id)
    this.section= event.target.id
  }
  checkStagiaireValid(): boolean {
    return this.stagiaire.stagiaireEcole === '' || this.stagiaire.stagiaireFuturDiplome === '' ||
      this.stagiaire.stagiaireNiveauEtude == null;
  }
  register() {
    console.log(this.role);
    var body={}
   
       body = {
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
        stagiaireEcole: this.stagiaire.stagiaireEcole,
        stagiaireFuturDiplome: this.stagiaire.stagiaireFuturDiplome,
        stagiaireNiveauEtude: this.stagiaire.stagiaireNiveauEtude,

        stagiaireFilier: {
          domaineId: this.filiere.domaineId,

        }
      }
    
    console.log(body);

    this.serviceAuth.register( this.role,body).subscribe(
      (data: any) => {
        this.router.navigateByUrl("/recruiting");
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
