import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CompaniesResponse, CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company.model';
import { Observable, Subscription, filter, forkJoin, map, mergeMap, of, startWith, tap } from 'rxjs';
import { Game } from '../../../models/game.model';
import { CompanyType } from '../../../enums/company-type.enum';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyOwnerRelation } from '../../../enums/company-owner-relation.enum';
import { Person } from '../../../models/person.model';


@Component({
  selector: 'vgdb-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrl: './company-detail.page.scss'
})
export class CompanyDetailPage implements OnInit, OnDestroy {

  public readonly CompanyOwnerRelation: typeof CompanyOwnerRelation = CompanyOwnerRelation;

  public company: Company;
  public companiesToBeParent: Company[];
  public companiesInCurrentSearch: Company[];
  public routerSubs: Subscription;
  public subcompaniesDivision: Company[] = [];
  public subcompaniesMerge: Company[] = [];
  public subcompaniesAdquision: Company[] = [];
  public backgroundStyle: any;
  public filteredCompanies: Observable<Company[]>;
  public companyParentForm: FormGroup;
  public pageDeveloped = 0;
  public pagePublished = 0;
  public peopleFromSelector: Person[];

  public dialog: DialogService;
  
  @ViewChild('addCompanyDialog') addCompanyDialog: TemplateRef<any>;
  @ViewChild('companyForm') companyForm: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('removeParentCompanyDialog') removeParentCompanyDialog: TemplateRef<any>;
  @ViewChild('addPeopleDialog') addPeopleDialog: TemplateRef<any>;

  constructor(private companiesService: CompaniesService,
              private dialogFactoryService: DialogFactoryService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.loadCompany();
    
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadCompany();
    });

  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadCompany();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteCompany() {
    this.closeDialog();
    this.companiesService.deleteCompany(this.company.id!).subscribe(result => {
      console.log('company', result)
      this.router.navigate(['companies']);
    });
  }

  public presentAddCompanyDialog() {

    this.companiesService.getList().subscribe(result => {
      this.companyParentForm = this.createCompanyForm();
      this.companiesToBeParent = result.companies;
      this.openDialog({
        headerText: 'Añadir compañia matriz',
        template: this.addCompanyDialog
      });

      this.filteredCompanies = this.companyParentForm.controls['ownerId'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.companiesService.getFilteredList(text):  of({} as CompaniesResponse)),
        map(companyRes => (companyRes.companies ? companyRes.companies : this.companiesToBeParent.slice())),
        map(company => this.filterCompanies(company)),
        tap((companies) => { this.companiesInCurrentSearch = companies} )
      );
    });
  }

  public displayName(companies: Company[]) {
    return (id: any) => companies && companies.length && companies.find(company => company.id === id)? companies.find(company => company.id === id)!.name : ''; 
  }

  public onAddParentCompany() {
    console.log(this.companyParentForm.value);
    this.companiesService.updateCompany(this.company.id!, this.companyParentForm.value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public removeParentCompany() {
    this.companiesService.updateCompany(this.company.id!, {ownerId: null, owner_relation: null} as unknown as Company).subscribe(result => {
      this.formSubmitted();
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar compañía',
      template: this.companyForm,
      context: this.company
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar compañía',
      template: this.deleteDialog
    });
  }

  public presentRemoveParentCompanyDialog() {
    this.openDialog({
      headerText: 'Desvincular compañía',
      template: this.removeParentCompanyDialog
    });
  }

  public gamesPageDevelopedChange(page: number) {
    this.pageDeveloped = page;
    this.loadCompany(page, this.pagePublished);
  }

  public gamesPagePublishedChange(page: number) {
    this.pagePublished = page;
    this.loadCompany(this.pageDeveloped, page);
  }

  public presentAddPeopleDialog() {
    this.openDialog({
      headerText: 'Añadir personas clave',
      template: this.addPeopleDialog
    });
  }

  public onPersonChange(value: any) {
    this.peopleFromSelector = value;
  }

  public addPerson() {
    this.peopleFromSelector = this.peopleFromSelector ? this.peopleFromSelector : [];
    const peopleToAdd = this.peopleFromSelector.filter(o => !this.company.people!.some((i: any) => i.id === o.id));
    const peopleToRemove = this.company.people!.filter(o => !this.peopleFromSelector.some((i: any) => i.id === o.id));
    const observables = [];
    if (peopleToAdd.length) {
      observables.push(this.companiesService.addPeople(this.company.id!, peopleToAdd));
    }
    if (peopleToRemove.length) {
      peopleToRemove.forEach(person => {
        observables.push(this.companiesService.removePerson(this.company.id!, person));
      });
    }

    if(observables.length) {
      forkJoin(observables).subscribe(result => {
        console.log('ok??', result)
        this.formSubmitted();
      });
    } else {
      this.closeDialog();
    }
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private loadCompany(pageDeveloped?: number, pagePublished?: number) {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.resetValues();
    this.companiesService.getCompany(id, pageDeveloped, pagePublished).subscribe(result => {
      console.log('company', result)
      this.company = result;
      if (this.company.sub_companies && this.company.sub_companies.length){
        this.subcompaniesAdquision = this.company.sub_companies.filter(company => company.owner_relation === CompanyOwnerRelation.adquisition);
        this.subcompaniesDivision = this.company.sub_companies.filter(company => company.owner_relation === CompanyOwnerRelation.division);
        this.subcompaniesMerge = this.company.sub_companies.filter(company => company.owner_relation === CompanyOwnerRelation.merge);
      }
      this.backgroundStyle = this.getBackgroundStyle(this.company);
    });
  }

  private resetValues() {
    this.subcompaniesAdquision = [];
    this.subcompaniesDivision = [];
    this.subcompaniesMerge = [];
  }

  private getBackgroundStyle(company: Company) {
    return {
      'background-color': company.color? company.color : 'rgb(68, 67, 67)'
    }
  }

  private filterCompanies(companies: Company[]): Company[] {
    return companies.filter(company => this.company.id !== company.id);
  }

  private createCompanyForm() {
    return this.formBuilder.group({
      ownerId: [null, Validators.required],
      owner_relation: [CompanyOwnerRelation.division, Validators.required]
    });
  }

}
