import { AuthServiceService } from './../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { JwtResponse } from './../../models/JwtResponse.model';
import { LoginRequest } from './../../models/LoginRequest.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class NgxRegisterComponent {
  user: any = {
    password: null,
    matricule: null
  };
  foo:any=1
  loginRequest: LoginRequest;

  testAuth = false;
  authFailed = false;
  constructor(
    private router: Router, private serviceAuth: AuthServiceService) {

  }

  login() {

    this.loginRequest = new LoginRequest(this.user.matricule, this.user.password);
    this.serviceAuth.login(this.loginRequest).subscribe(
      (data: JwtResponse) => {

        localStorage.setItem('token', data.token);
        localStorage.setItem('userFirstName', data.userFirstName);
        localStorage.setItem('userLastName', data.userLastName);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if (data.userPictureUrl != null && data.userPictureUrl != "") {
          localStorage.setItem("picture", data.userPictureUrl)
        }
        this.router.navigateByUrl("/recruiting");
        this.testAuth = false;
      },
      (error) => {
        console.log("error");
        this.testAuth = true;
      }
    )
  }
 
  next(event){
    // console.log(event.target.id);
        this.foo=event.target.id
  }
 
}

