import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, forkJoin, map, mergeMap, of, startWith, tap } from 'rxjs';

import { Franchise } from '../../../models/franchise.model';
import { FranchisesService } from '../../../services/franchises.service';
import { Person } from '../../../models/person.model';
import { SeriesService } from '../../../services/series.service';
import { Serie } from '../../../models/serie.model';
import { CharacterRole } from '../../../enums/character-role.enum';
import { Character } from '../../../models/character.model';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { CompaniesResponse, CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company.model';


@Component({
  selector: 'vgdb-franchise-detail',
  templateUrl: './franchise-detail.page.html',
  styleUrl: './franchise-detail.page.scss'
})
export class FranchiseDetailPage implements OnInit, OnDestroy {

  public franchise: Franchise;
  public charactersMain: Character[] = [];
  public charactersSecondary: Character[] = [];
  public charactersAntagonist: Character[] = [];
  public charactersVillain: Character[] = [];
  public seriesMain: Serie[] = [];
  public seriesNotMain: Serie[] = [];
  public routerSubs: Subscription;
  public backgroundStyle: any;

  public companies: Company[];
  public addCompanyForm: FormGroup;
  public filteredCompanies: Observable<Company[]>;
  public companiesInCurrentSearch: Company[];

  public creatorsFromSelector: Person[];

  public parentFranchisesFromSelector: Franchise[];

  public addingOwnerCompany: boolean = true;

  public manageSerieShowList: boolean = true;
  public selectedSerie?: Serie;

  public dialog: DialogService;
  
  @ViewChild('addCompanyDialog') addCompanyDialog: TemplateRef<any>;
  @ViewChild('franchiseForm') franchiseForm: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('removeCompanyDialog') removeCompanyDialog: TemplateRef<any>;
  @ViewChild('addCreatorsDialog') addCreatorsDialog: TemplateRef<any>;
  @ViewChild('addParentFranchisesDialog') addParentFranchisesDialog: TemplateRef<any>;

  @ViewChild('companyForm') companyForm: TemplateRef<any>;

  @ViewChild('manageSeriesDialog') manageSeriesDialog: TemplateRef<any>;
  

  constructor(private companiesService: CompaniesService,
    private franchisesService: FranchisesService,
    private dialogFactoryService: DialogFactoryService,
    private formBuilder: FormBuilder,
    private seriesService: SeriesService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadFranchise();
    console.log('franchDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadFranchise();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadFranchise();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteFranchise() {
    this.closeDialog();
    this.franchisesService.deleteFranchise(this.franchise.id!).subscribe(result => {
      this.router.navigate(['franchises']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar franquicia',
      template: this.franchiseForm,
      context: this.franchise
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar franquicia',
      template: this.deleteDialog
    });
  }

  public presentAddCompanyDialog(owner: boolean) {
    this.addingOwnerCompany = owner;
    this.companiesService.getList().subscribe(result => {
      this.addCompanyForm = this.createCompanyForm();
      this.companies = result.companies;
      this.openDialog({
        headerText: this.addingOwnerCompany ? 'Añadir compañía propietaria' : 'Añadir compañía creadora',
        template: this.addCompanyDialog
      });

      this.filteredCompanies = this.addCompanyForm.controls['ownerId'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.companiesService.getFilteredList(text):  of({} as CompaniesResponse)),
        map(companyRes => (companyRes.companies ? companyRes.companies : this.companies.slice())),
        tap((companies) => { this.companiesInCurrentSearch = companies} )
      );
    });
  }

  public presentRemoveCompanyDialog(owner: boolean) {
    this.addingOwnerCompany = owner;
    this.openDialog({
      headerText: 'Desvincular compañía',
      template: this.removeCompanyDialog
    });
  }

  public onAddCompany() {
    let value: any;
    value = this.addingOwnerCompany? this.addCompanyForm.value : {company_creator_id: this.addCompanyForm.get('ownerId')!.value};
    console.log(this.addCompanyForm.value);
    this.franchisesService.updateFranchise(this.franchise.id!, value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public removeCompany() {
    let value: any;
    value = this.addingOwnerCompany? {ownerId: null} : {company_creator_id: null};
    value = value as unknown as Franchise;
    this.franchisesService.updateFranchise(this.franchise.id!, value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public displayName(companies: Company[]) {
    return (id: any) => companies && companies.length && companies.find(company => company.id === id)? companies.find(company => company.id === id)!.name : ''; 
  }

  public presentAddCreatorsDialog() {
    this.openDialog({
      headerText: 'Añadir creador',
      template: this.addCreatorsDialog
    });
  }

  public onCreatorChange(value: Person[]) {
    this.creatorsFromSelector = value;
  }

  public addCreator() {
    this.creatorsFromSelector = this.creatorsFromSelector ? this.creatorsFromSelector : [];
    const creatorsToAdd = this.creatorsFromSelector.filter(o => !this.franchise.creators!.some((i: any) => i.id === o.id));
    const creatorsToRemove = this.franchise.creators!.filter(o => !this.creatorsFromSelector.some((i: any) => i.id === o.id));
    const observables = [];
    if (creatorsToAdd.length) {
      observables.push(this.franchisesService.addCreators(this.franchise.id!, creatorsToAdd));
    }
    if (creatorsToRemove.length) {
      creatorsToRemove.forEach(creator => {
        observables.push(this.franchisesService.removeCreator(this.franchise.id!, creator));
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


  public presentAddParentFranchisesDialog() {
    this.openDialog({
      headerText: 'Añadir franquicia',
      template: this.addParentFranchisesDialog
    });
  }

  public onParentFranchiseChange(value: Franchise[]) {
    this.parentFranchisesFromSelector = value;
  }

  public addParentFranchise() {
    this.parentFranchisesFromSelector = this.parentFranchisesFromSelector ? this.parentFranchisesFromSelector : [];
    const franchisesToAdd = this.parentFranchisesFromSelector.filter(o => !this.franchise.parentFranchises!.some((i: any) => i.id === o.id));
    const franchisesToRemove = this.franchise.parentFranchises!.filter(o => !this.parentFranchisesFromSelector.some((i: any) => i.id === o.id));
    const observables = [];
    if (franchisesToAdd.length) {
      observables.push(this.franchisesService.addParentFranchises(this.franchise.id!, franchisesToAdd));
    }
    if (franchisesToRemove.length) {
      franchisesToRemove.forEach(franchise => {
        observables.push(this.franchisesService.removeParentFranchise(this.franchise.id!, franchise));
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

  public presentManageSerieDialog() {
    this.manageSerieShowList = true;
    this.selectedSerie = undefined;
    this.openDialog({
      headerText: 'Gestionar series',
      template: this.manageSeriesDialog
    });
  }

  public addSerie(serie?: Serie) {
    if (serie) {
      this.selectedSerie = serie;
    }
    this.manageSerieShowList = false;
  }

  public deleteSerie(serie: Serie) {
    this.seriesService.deleteSerie(serie.id!).subscribe(result => {
      this.formSubmitted();
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private loadFranchise() {
    this.resetData();
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.franchisesService.getFranchise(id).subscribe(result => {
      console.log('franch', result)
      this.franchise = result;
      if (this.franchise.series && this.franchise.series.length) {
        this.seriesMain = this.franchise.series.filter(serie => serie.is_main);
        this.seriesNotMain = this.franchise.series.filter(serie => !serie.is_main);
      }
      if (this.franchise.characters && this.franchise.characters.length) {
        this.charactersMain = this.franchise.characters.filter(character => character.role_in_franchise === CharacterRole.main);
        this.charactersSecondary = this.franchise.characters.filter(character => character.role_in_franchise === CharacterRole.secondary);
        this.charactersAntagonist = this.franchise.characters.filter(character => character.role_in_franchise === CharacterRole.antagonist);
        this.charactersVillain = this.franchise.characters.filter(character => character.role_in_franchise === CharacterRole.villain);
      }
      this.backgroundStyle = this.getBackgroundStyle(this.franchise);
    });
  }

  private getBackgroundStyle(franchise: Franchise) {
    return {
      'background-color': franchise.color? franchise.color : 'rgb(68, 67, 67)'
    }
  }

  private createCompanyForm() {
    return this.formBuilder.group({
      ownerId: [null, Validators.required]
    });
  }

  private resetData() {
    this.charactersMain = [];
    this.charactersSecondary = [];
    this.charactersAntagonist = [];
    this.charactersVillain = [];
    this.seriesMain = [];
    this.seriesNotMain = [];
  }

}