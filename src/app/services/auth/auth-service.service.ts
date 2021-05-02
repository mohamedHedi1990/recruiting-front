import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../../models/JwtResponse.model';
import { LoginRequest } from '../../models/LoginRequest.model';
import { UtilsService } from '../utils.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }



  login(loginRequest:LoginRequest):Observable<JwtResponse> {
    return this.http.post<JwtResponse>(UtilsService.API_AUTH, loginRequest);

  }
  register(url:string,object:any):Observable<any> {
    console.log(object);

    return this.http.post<any>(UtilsService.API+url, object).pipe(map((res:any)=>{
      return res
    }));
// return object
  }


}
