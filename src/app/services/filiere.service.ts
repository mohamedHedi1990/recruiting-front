import { Filiere } from './../models/filiere';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private utilsService: UtilsService) { }
  public getAllFilieres() {
    return this.utilsService.get(UtilsService.API + 'domaine').pipe(map((res: any) => {
      return res
    }, err => {
      console.log(err);

    }))
  }
}
