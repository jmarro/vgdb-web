import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Character } from '../../../models/character.model';
import { CharactersService } from '../../../services/characters.service';
import { Observable, Subscription, filter, forkJoin, map, mergeMap, of, startWith, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { Game } from '../../../models/game.model';
import { CharacterRole } from '../../../enums/character-role.enum';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Franchise } from '../../../models/franchise.model';
import { FranchisesResponse, FranchisesService } from '../../../services/franchises.service';

@Component({
  selector: 'vgdb-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit, OnDestroy {

  public readonly CharacterRole: typeof CharacterRole = CharacterRole;

  public character: Character;
  public routerSubs: Subscription;

  public gamesPlayable: Game[] = [];
  public gamesSecondary: Game[] = [];
  public gamesAntagonist: Game[] = [];
  public gamesVillain: Game[] = [];
  public backgroundStyle: any;

  public filteredFranchises: Observable<Franchise[]>;
  public franchiseForm: FormGroup;
  public franchises: Franchise[];
  public franchisesInCurrentSearch: Franchise[];

  public creatorsFromSelector: Person[];

  public dialog: DialogService;

  @ViewChild('characterForm') characterForm: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('addFranchiseDialog') addFranchiseDialog: TemplateRef<any>;
  @ViewChild('removeFranchiseDialog') removeFranchiseDialog: TemplateRef<any>;
  @ViewChild('addCreatorsDialog') addCreatorsDialog: TemplateRef<any>;

  constructor(private charactersService: CharactersService,
    private franchisesService: FranchisesService,
    private dialogFactoryService: DialogFactoryService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.loadCharacter();
    console.log('charDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadCharacter();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public create() {
    console.log('create')
    const creators = [{id: 2}] as Person[];
    if (this.character && this.character.id) {
      this.charactersService.addCreators(this.character.id, creators).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteCharacter() {
    this.closeDialog();
    this.charactersService.deleteCharacter(this.character.id!).subscribe(result => {
      console.log('character', result)
      this.router.navigate(['characters']);
    });
  }


  public formSubmitted() {
    this.closeDialog();
    this.loadCharacter();
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar personaje',
      template: this.characterForm,
      context: this.character
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar personaje',
      template: this.deleteDialog
    });
  }

  public presentAddFranchiseDialog() {

    this.franchisesService.getList().subscribe(result => {
      this.franchiseForm = this.createFranchiseForm();
      this.franchises = result.franchises;
      this.openDialog({
        headerText: 'Añadir franquicia',
        template: this.addFranchiseDialog
      });

      this.filteredFranchises = this.franchiseForm.controls['franchise_id'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.franchisesService.getFilteredList(text):  of({} as FranchisesResponse)),
        map(franchiseRes => (franchiseRes.franchises ? franchiseRes.franchises : this.franchises.slice())),
        tap((franchises) => { this.franchisesInCurrentSearch = franchises} )
      );
    });
  }

  public displayName(franchises: Franchise[]) {
    return (id: any) => franchises && franchises.length && franchises.find(franchise => franchise.id === id)? franchises.find(franchise => franchise.id === id)!.name : ''; 
  }

  public onAddFranchise() {
    console.log(this.franchiseForm.value);
    this.charactersService.updateCharacter(this.character.id!, this.franchiseForm.value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public presentRemoveFranchiseDialog() {
    this.openDialog({
      headerText: 'Desvincular franquicia',
      template: this.removeFranchiseDialog
    });
  }

  public removeFranchise() {
    this.charactersService.updateCharacter(this.character.id!, {franchise_id: null, role_in_franchise: null} as unknown as Character).subscribe(result => {
      this.formSubmitted();
    });
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
    const creatorsToAdd = this.creatorsFromSelector.filter(o => !this.character.creators!.some((i: any) => i.id === o.id));
    const creatorsToRemove = this.character.creators!.filter(o => !this.creatorsFromSelector.some((i: any) => i.id === o.id));
    const observables = [];
    if (creatorsToAdd.length) {
      observables.push(this.charactersService.addCreators(this.character.id!, creatorsToAdd));
    }
    if (creatorsToRemove.length) {
      creatorsToRemove.forEach(creator => {
        observables.push(this.charactersService.removeCreator(this.character.id!, creator));
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

  private loadCharacter() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.charactersService.getCharacter(id).subscribe(result => {
      console.log('char', result)
      this.character = result;

      if (this.character.games && this.character.games.length) {
        this.gamesPlayable = this.character.games.filter(game => game.Game_Character?.type === CharacterRole.playable);
        this.gamesSecondary = this.character.games.filter(game => game.Game_Character?.type === CharacterRole.secondary);
        this.gamesAntagonist = this.character.games.filter(game => game.Game_Character?.type === CharacterRole.antagonist);
        this.gamesVillain = this.character.games.filter(game => game.Game_Character?.type === CharacterRole.villain);
      }

      this.backgroundStyle = this.getBackgroundStyle(this.character);
    });
  }

  private getBackgroundStyle(character: Character) {
    return {
      'background-color': character.color? character.color : 'rgb(68, 67, 67)'
    }
  }

  private createFranchiseForm() {
    return this.formBuilder.group({
      franchise_id: [null, Validators.required],
      role_in_franchise: [CharacterRole.main, Validators.required]
    });
  }

}
