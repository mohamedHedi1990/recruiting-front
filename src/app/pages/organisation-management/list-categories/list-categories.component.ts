import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categorie = null;
  categoriesList = [];
  rowcategorie = null;
  loading = false;

  titleHeader: any;
  displayDeleteCategorie:boolean=false;
  constructor(private UtilsService: UtilsService) { }


  ngOnInit(): void {
    
    this.getAllCategories();
    this.initCategorie();
    this.displayDeleteCategorie=false;
  }


  getAllCategories() {
    const context = this;
    this.UtilsService.get(UtilsService.API_POSITIONCATEGORY).subscribe(
      (response:any) => {
        context.categoriesList = response;
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement de la liste des catégories`
        );
      }
    );
  }

  initCategorie() {
    this.categorie = {
      positionCategoryId: null,
      positionCategoryLabel: null,
      positionCategoryDetails: null,
      positionList:null,
    };
  }
 
  checkCategorieValid(){
    return this.categorie.positionCategoryLabel === "" ;
  }
  deleteCategorie(rowdata) {
    this.categorie = rowdata;
    console.log("----delete categorie----")
    this.displayDeleteCategorie=true;

  }
  delCategorie()
  {
    const context = this;
    this.UtilsService.delete(
      UtilsService.API_POSITIONCATEGORY+"/"+this.categorie.positionCategoryId,
    ).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
        'Catégorie supprimé avec succés',
        `La catégorie ${this.categorie.positionCategoryLabel} a été supprimé avec succcés`);
        context.displayDeleteCategorie = false;
        context.initCategorie();
        context.getAllCategories();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression du catégorie ${this.categorie.positionCategoryLabel}`
        );
        context.displayDeleteCategorie = false;
        context.initCategorie();
        context.getAllCategories();
      }
    );
  }

 
  editCategorie(categorie){
      const context = this;
     
          this.UtilsService.post(
            UtilsService.API_POSITIONCATEGORY,
            categorie
          ).subscribe(
            (response) => {
              this.UtilsService.showToast(
                "success",
                "Catégorie d'évaluation modifié avec succès",
                `La catégorie  ${categorie.positionCategoryLabel} été modifié avec succès`
              );
              context.initCategorie();
              context.getAllCategories();
            },
            (error) => {
              this.UtilsService.showToast(
                "danger",
                "Erreur interne",
                `Un erreur interne a été produit lors de la modification du catégorie ${categorie.positionCategoryLabel}`
              );
              context.initCategorie();
            }
          );
    }
  
  

  saveNewCategorie() {
    const context = this;

    
        this.UtilsService.post(
          UtilsService.API_POSITIONCATEGORY,
          this.categorie
        ).subscribe(
          (response) => {
            this.UtilsService.showToast(
              "success",
              "Catégorie ajouté avec succès",
              `La catégorie ${this.categorie.positionCategoryLabel} a été ajouté avec succès`
            );
            context.initCategorie();
            context.getAllCategories();
          },
          (error) => {
            this.UtilsService.showToast(
              "danger",
              "Erreur interne",
              `Un erreur interne a été produit lors de l'ajout du catégorie ${this.categorie.positionCategoryLabel}`
            );
            context.initCategorie();
          }
        ); 
  }

}
