import { Component, Input, OnChanges, EventEmitter,OnInit, Output, SimpleChanges } from '@angular/core';
import { Position } from '../../../models/Position.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { UtilsService } from '../../../services/utils.service';
import {DatePipe} from "@angular/common";
import jsPDF from "jspdf";
import "jspdf-autotable";


@Component({
  selector: 'ngx-position-list-table',
  templateUrl: './position-list-table.component.html',
  styleUrls: ['./position-list-table.component.scss']
})
export class PositionListTableComponent implements OnInit, OnChanges {

  selectedFile: any = null;
  displayImporterPosition=false;
  showImportButton = false;

@Output() reloadPositionListEvent = new EventEmitter();
position :Position  = new Position();
positions_list ;
loading;
addNewPositionModal =false;


viewPositionModal=false;
titleHeader ="Ajouter une nouvelle position"
titleViewPoition=null;
viewPositionTable=[];
displayDeletePosition=false;
currentDate=new Date();
  exportColumns: any[];
  positionToExport:any[]=[];
  cols: any[];
  @Output() showPositionFunctionSheetWindowEvent=new EventEmitter();

  constructor(private organisationManagementService: OrganisationManagementService , private utilsService: UtilsService,private datePipe:DatePipe) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    let current=new Date();
    this.position.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.position.endDate = this.datePipe.transform(new Date(current.getFullYear()+99 ,current.getMonth(),current.getDay()), 'yyyy-MM-dd');
    this.getAllPositions();
    this.exportColumns = [
      { dataKey: 'positionLabel', title: 'Dénomination' },
      { dataKey: 'jobLabel', title: 'Métier' },
      { dataKey: 'companyLabel', title: 'Société' },
      { dataKey: 'businessUnitLabel', title: 'Unité organisationnelle' },
      { dataKey: 'hierarchicalManagerPositionLabel', title: 'Supérieure hiérarchique' },
      { dataKey: 'functionalManagerPositionLabel', title: 'Supérieure Fonctionel' },
      { dataKey: 'status', title: 'Status' }
    ];

  }

  getExportColums(){
    this.positions_list.forEach(position => {
      let positionToExport = {
        'positionLabel':position.positionLabel,
        'jobLabel':position.job?.jobLabel,
        'companyLabel':position.company?.companyLabel,
        'businessUnitLabel': position.businessUnit?.businessUnitLabel,
        'hierarchicalManagerPositionLabel':position.hierarchicalManagerPosition?.positionLabel,
        'functionalManagerPositionLabel':position.functionalManagerPosition?.positionLabel,
        'status':''
      }
      if(this.checkPositionActive(position)){
        positionToExport.status="Active"
      }else{
        positionToExport.status="Non Active"
      }
      this.positionToExport.push(positionToExport);
    })
  }
  addNewPosition() {
    this.position = new Position();
    this.position.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let current=new Date();
    this.position.endDate = this.datePipe.transform(new Date(current.getFullYear()+99 ,current.getMonth(),current.getDay()), 'yyyy-MM-dd');

      //let racine = new Position();
      //racine.positionLabel = "Racine";
      //this.position.hierarchicalManagerPosition = racine;


    this.addNewPositionModal = true;

  }
  saveNewPosition(position : Position){
    if(position.company == null||position.company.companyId == undefined || position.company.companyId == null){
      position.company=null;
    }else {
      position.company = position.company?.companyId;
    }
    if(position.job == null || position.job.jobId == undefined ||position.job.jobId == null){
      position.job=null;
    }else {
      position.job = position.job?.jobId;
    }
    if(position.businessUnit == null ||position.businessUnit.businessUnitId == undefined || position.businessUnit.businessUnitId == null){
      position.businessUnit=null;
    }else {
      position.businessUnit = position.businessUnit?.businessUnitId;
    }
    if (position.hierarchicalManagerPosition != null) {
      position.hierarchicalManagerPosition = position.hierarchicalManagerPosition.positionId;
    }
    if (position.functionalManagerPosition != null) {
      position.functionalManagerPosition = position.functionalManagerPosition.positionId;
    }

   //position.positionCategory = position.positionCategory.positionCategoryId;
  /*position.evaluationCriteriaList.forEach(elm =>{
    delete elm.position;
  });

   */
  /*position.functionalRoles.forEach(elem => {
    delete elem.hierarchicalManagerPosition.hierarchicalManagerPosition;
  });*/


   this.organisationManagementService.post(OrganisationManagementService.API_POSITION,position).subscribe(
    (response: any) => {
      this.addNewPositionModal = false;
      if(this.position.positionId == null || this.position.positionId == undefined ){
      this.utilsService.showToast(
        'success',
        'Position ajouté avec succés',
        `La position   ${this.position.positionLabel} a été ajouté avec succcés`);
      }else{
        this.utilsService.showToast(
          'success',
          'Position modifié avec succés',
          `La position   ${this.position.positionLabel} a été modifié avec succcés`);
      }

        this.initPosition();
        this.getAllPositions();
      },
    (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la sauvegarde du position ${this.position.positionLabel}`
      );
      this.initPosition();
      this.addNewPositionModal = false;
    },
  );


  }
  getAllPositions(){
    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_POSITION).subscribe( response => {
        context.positions_list = response;
        this.getExportColums();

      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
      });
    }
  editPosition(position: Position){
    this.titleHeader ="Modifier une position"
    this.position = position;
    this.position.functionalManagerPosition = position.functionalManagerPosition;
    this.position.startDate=this.datePipe.transform(this.position.startDate, 'yyyy-MM-dd');
    this.position.endDate=this.datePipe.transform(this.position.endDate, 'yyyy-MM-dd');

    this.addNewPositionModal = true;
  }
  deletePosition(position){
    this.position = position;
    this.displayDeletePosition=true;
  }
    delPosition(){
    const context = this;
    this.organisationManagementService.delete(OrganisationManagementService.API_POSITION+this.position.positionId).subscribe( response => {
      if (response.MESSAGE === 'DELETED') {
        this.organisationManagementService.showToast('success',
          'Position supprimée avec succés',
          `La societé'  ${this.position.positionLabel} a été supprimée avec succcés`);
          this.displayDeletePosition=false;
          this.getAllPositions();
          this.initPosition();
      }
      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du suppression de position`);
          this.displayDeletePosition=false;
          this.initPosition()
      });

  }
  initPosition(){
    this.position = new Position();

   }

  viewPosition(positionTable: Position){
   this.titleViewPoition= "Fiche de la position "+positionTable.positionLabel;
    console.log("-------------------", positionTable);
    this.position = positionTable;
   this.viewPositionModal=true;
  }

  hidePositionWindow() {
    this.addNewPositionModal = false;
    this.initPosition();
    //this.getAllPositions();
  }

  checkPositionActive(position){
    let current=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return new Date(position.endDate) >= new Date(current) && new Date(position.startDate) <= new Date(current);
  }
  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('p','pt');
    doc['autoTable'](this.exportColumns, this.positionToExport);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("positions.pdf");
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.positionToExport);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "positions");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });

  }
  showPositionFunctionSheet(position){
    this.showPositionFunctionSheetWindowEvent.emit(position);
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != null) {
      this.showImportButton = true;
    }
  }

  importer() {
    const context = this;
    let formData = new FormData()
    formData.append('file', this.selectedFile)
    this.organisationManagementService.post(OrganisationManagementService.API_POSITION + "/import", formData).subscribe(
      (response) => {
        this.organisationManagementService.showToast('success',
          "Document importé avec succès",
          `La liste des positions a été importé avec succès`);
        this.displayImporterPosition=false;
        context.getAllPositions();
      }, (error) => {
        this.organisationManagementService.showToast('danger',
          "Erreur interne",
          `Un erreur interne a été produit lors de l'import des positions. Veuillez verifier le format du fichier importé et verifiez bien qu'elle est compatible avec le format requis! `);
      })
  }

  showImportWindow(){
    this.displayImporterPosition=true;
  }

  closeImportWindow() {
    this.selectedFile = null;
    this.displayImporterPosition=false;
  }






}
