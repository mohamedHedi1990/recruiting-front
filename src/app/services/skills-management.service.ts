import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsManagementService {

  public static REMOTE_ADDRESS = "http://localhost:8090/bs-skills-management/";
  public static API_SKILLS_GROUP = SkillsManagementService.REMOTE_ADDRESS + "api/skills-group";

  public static API_SKILL = SkillsManagementService.REMOTE_ADDRESS + "api/skill";
  public static API_SUB_SKILL=SkillsManagementService.REMOTE_ADDRESS +"api/sub-skill";
  public static API_SKILL_LEVEL=SkillsManagementService.REMOTE_ADDRESS +"api/skill-level";
  public static API_POSITION_SUB_SKILL=SkillsManagementService.REMOTE_ADDRESS+"api/position-sub-skill/";
  header = new HttpHeaders();

  constructor(private toastrService: NbToastrService, private httpClient: HttpClient,
              private datePipe: DatePipe) {

  }

  public showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  public post( url :any ,object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public put( url : any , object : any): Observable<any> {

    return this.httpClient.put(url,object );
  }

  public getAll(url): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url): Observable<any> {

    return this.httpClient.delete(url);
  }

}
