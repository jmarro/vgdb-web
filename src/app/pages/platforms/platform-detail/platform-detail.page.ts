import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Platform } from '../../../models/platform.model';
import { PlatformsService } from '../../../services/platforms.service';
import { Observable, Subscription, filter, map, mergeMap, of, startWith, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { PlatformModel } from '../../../models/platformModel.model';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { PlatformType } from '../../../enums/platform-type.enum';
import { Company } from '../../../models/company.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesResponse, CompaniesService } from '../../../services/companies.service';
import { ModelsService } from '../../../services/models.service';

@Component({
  selector: 'vgdb-platform-detail',
  templateUrl: './platform-detail.page.html',
  styleUrl: './platform-detail.page.scss'
})
export class PlatformDetailPage implements OnInit, OnDestroy {

  public platform: Platform;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  public companies: Company[];
  public addCompanyForm: FormGroup;
  public filteredCompanies: Observable<Company[]>;
  public companiesInCurrentSearch: Company[];

  public manageModelsShowList: boolean = true;
  public selectedModel?: PlatformModel;

  public dialog: DialogService;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('platformForm') platformForm: TemplateRef<any>;
  @ViewChild('addCompanyDialog') addCompanyDialog: TemplateRef<any>;
  @ViewChild('removeCompanyDialog') removeCompanyDialog: TemplateRef<any>;
  @ViewChild('manageModelsDialog') manageModelsDialog: TemplateRef<any>;

  constructor(private companiesService: CompaniesService,
    private dialogFactoryService: DialogFactoryService,
    private formBuilder: FormBuilder,
    private modelsService: ModelsService,
    private platformsService: PlatformsService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadPlatform();

    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadPlatform();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadPlatform();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deletePlatform() {
    this.closeDialog();
    this.platformsService.deletePlatform(this.platform.id!).subscribe(result => {
      this.router.navigate(['platforms']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar plataforma',
      template: this.platformForm,
      context: this.platform
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar plataforma',
      template: this.deleteDialog
    });
  }

  public getPlatformType(type: PlatformType): string {
    switch(type) {
      case PlatformType.desktop: 
        return 'Sobremesa';
      case PlatformType.portable:
        return 'Portátil';
      case PlatformType.peripheral:
        return 'Periférico';
      default:
        return 'Híbrida';
    }
  }

  public presentAddCompanyDialog() {
    this.companiesService.getList().subscribe(result => {
      this.addCompanyForm = this.createCompanyForm();
      this.companies = result.companies;
      this.openDialog({
        headerText: 'Añadir compañía',
        template: this.addCompanyDialog
      });

      this.filteredCompanies = this.addCompanyForm.controls['manufacturerId'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.companiesService.getFilteredList(text):  of({} as CompaniesResponse)),
        map(companyRes => (companyRes.companies ? companyRes.companies : this.companies.slice())),
        tap((companies) => { this.companiesInCurrentSearch = companies} )
      );
    });
  }

  public presentRemoveCompanyDialog() {
    this.openDialog({
      headerText: 'Desvincular compañía',
      template: this.removeCompanyDialog
    });
  }

  public onAddCompany() {
    console.log(this.addCompanyForm.value);
    this.platformsService.updatePlatform(this.platform.id!, this.addCompanyForm.value).subscribe(result => {
      this.formSubmitted();
    });
  }


  public presentManageModelsDialog() {
    this.manageModelsShowList = true;
    this.selectedModel = undefined;
    this.openDialog({
      headerText: 'Gestionar modelos',
      template: this.manageModelsDialog
    });
  }

  public addModel(model?: PlatformModel) {
    if (model) {
      this.selectedModel = model;
    }
    this.manageModelsShowList = false;
  }

  public deleteModel(model: PlatformModel) {
    this.modelsService.deleteModel(model.id!).subscribe(result => {
      this.formSubmitted();
    });
  }

  public removeCompany() {
    this.platformsService.updatePlatform(this.platform.id!, {manufacturerId: null} as unknown as Platform).subscribe(result => {
      this.formSubmitted();
    });
  }

  public displayName(companies: Company[]) {
    return (id: any) => companies && companies.length && companies.find(company => company.id === id)? companies.find(company => company.id === id)!.name : ''; 
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private loadPlatform() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.platformsService.getPlatform(id).subscribe(result => {
      console.log('platform', result)
      this.platform = result;
      this.backgroundStyle = this.getBackgroundStyle(this.platform);
    });
  }

  private getBackgroundStyle(platform: Platform) {
    return {
      'background-color': platform.color? platform.color : 'rgb(68, 67, 67)'
    }
  }

  private createCompanyForm() {
    return this.formBuilder.group({
      manufacturerId: [null, Validators.required]
    });
  }

}