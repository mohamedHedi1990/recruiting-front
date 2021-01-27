import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { UtilsService } from "./../../../services/utils.service";
import { DatePipe } from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: any[];
  loading = false;
  showUserWindow = false;
  user = null;
  displayDeleteUser = false;
  pipe = new DatePipe('en-US');
  mySimpleFormat;
  constructor(private UtilsService: UtilsService,private sanitizer: DomSanitizer, public dialogService: DialogService) {

  }

  
  ngOnInit(): void {
    this.initUser();
     this.getAllUsers();
  }

  saveNewUser(userObject) {
    const context = this;
    this.user=userObject.user;
    this.user.isBlocked=false;
    this.mySimpleFormat = this.pipe.transform(this.user.userBirthDate, 'dd-MM-yyyy');
    this.user.userBirthDate= this.mySimpleFormat;
    this.mySimpleFormat =   this.pipe.transform(this.user.userHirringDate, 'dd-MM-yyyy');
    this.user.userHirringDate = this.mySimpleFormat;
    this.UtilsService.post(UtilsService.API_USER, this.user).subscribe( response => {
       if(userObject.userPicture!=null){
        this.saveUserPicture(response.userId, userObject.userPicture);
       }else{
        this.hideUserWindow();
        this.getAllUsers();
        this.initUser();
        if ( this.user.userId == null) {
          this.UtilsService.showToast('success',
            'Utilisateur ajouté avec succés',
            `L'utlisateur'  ${this.user.userLogin} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Utilisateur modfié avec succés',
            `L'utlisateur  ${this.user.userLogin} a été modifié avec succcés`);
        }
       } 
      
      },
      error => {
        console.log(error);
        this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la sauvegarde du utilisateur ${this.user.userLogin}`); });

  }
  saveUserPicture(userId, userPicture) {
    const formData = new FormData();
    formData.append('file', userPicture);
    this.UtilsService.post(UtilsService.API_FILE + '/ADD_USER_PICTURE/' + userId, formData).subscribe(response => {
      this.hideUserWindow();
      if ( this.user.userId == null) {
        this.UtilsService.showToast('success',
          'Utilisateur ajouté avec succés',
          `L'utlisateur'  ${this.user.userLogin} a été ajouté avec succcés`);
      } else {
        this.UtilsService.showToast('success',
          'Utilisateur modfié avec succés',
          `L'utlisateur  ${this.user.userLogin} a été modifié avec succcés`);
      }
          
      this.getAllUsers();
      this.initUser();
    },  error => {this.UtilsService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors de la sauvegarde du utilisateur ${this.user.userLogin}`); });
}

  getAllUsers() {

    const context = this;
    this.UtilsService.get(UtilsService.API_USER).subscribe( response => {
      console.log("USERS---------------",response)
        context.users = response;
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des utilisateurs`);
      });

  }
  editUser(user) {
    this.user = user;
    this.showUserWindow = true;
  }

  delUser() {
    const context = this;
    const url = UtilsService.API_USER + '/' + this.user.userId;
    this.UtilsService.delete(`${UtilsService.API_USER}/${this.user.userId}`).subscribe( response => {
        context.users = response;
        this.UtilsService.showToast('success',
          'Utilisateur supprimé avec succés',
          `L'utilisateur'  ${this.user.userLogin} a été supprimé avec succcés`);
        context.getAllUsers();
        context.initUser();
        context.displayDeleteUser = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression d'utilisateur ${this.user.userLogin}`);
        context.displayDeleteUser = false;
      });


  }

  deleteUser(user) {
    console.log("USEEEEER--------",user);
   this.user = user;
   this.displayDeleteUser = true;

  }

  hideUserWindow() {
    this.showUserWindow = false;
  }

  initUser() {
    this.user = {
      userId: null,
      userRegistrationNumber: '',
      userFirstName: '',
      userLastName: '',
      userPictureUrl: '',
      userBirthDate: '',
      userGender: '',
      userBirthCountry: '',
      userBirthCity: '',
      userHirringDate: '',
      userAddress: '',
      userEmail: '',
      userPhoneNumber: '',
      userLogin: '',
      userPassword: '',
      userCivilStatus: '',
      isBlocked: '',
    };
  }

  
  bloquerUser(user){
    this.UtilsService.put(UtilsService.API_USER+'/blockuser/'+user.userId,null).subscribe(response => {
      console.log(response);
      this.hideUserWindow();
        this.UtilsService.showToast('success',
          'Utilisateur bloqué avec succés',
          `L'utlisateur  ${user.userLogin} a été bloqué avec succcés`);
     
          
      this.getAllUsers();
      this.initUser();
    },  error => {this.UtilsService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors du blocage du utilisateur ${user.userLogin}`); });
}

}