import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationManagementService {

  public static REMOTE_ADDRESS = "http://localhost:8090/";
  public static bs_organisation_base_url = OrganisationManagementService.REMOTE_ADDRESS +'bs-organisation-management/';
  public static API_COMPANY= OrganisationManagementService.bs_organisation_base_url + "api/company/";
  public static API_BUSINESS_UNIT= OrganisationManagementService.bs_organisation_base_url + "api/business-unit/";
  public static API_FILE = OrganisationManagementService.bs_organisation_base_url+ 'api/file/';

  public static API_POSITION_CATEGORY= OrganisationManagementService.bs_organisation_base_url + "api/position-category/";
  public static API_POSITION= OrganisationManagementService.bs_organisation_base_url + "api/position/";
  public static API_POSITION_LITE= OrganisationManagementService.bs_organisation_base_url + "api/position/lite";
  public static API_MISSION= OrganisationManagementService.bs_organisation_base_url + "api/mission/";


  header = new HttpHeaders();
  constructor(
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {}

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

  public post(url: string, object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public put(url: string, object: any): Observable<any> {

    return this.httpClient.put(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }



}

