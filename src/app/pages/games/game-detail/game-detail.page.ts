import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, forkJoin, map, mergeMap, of, startWith, tap } from 'rxjs';
import { Game } from '../../../models/game.model';
import { GamesService } from '../../../services/games.service';
import { Genre } from '../../../models/genre.model';
import { Company } from '../../../models/company.model';
import { CompanyType } from '../../../enums/company-type.enum';
import { Character } from '../../../models/character.model';
import { CharacterRole } from '../../../enums/character-role.enum';
import { Game_Award } from '../../../models/game_award.model';
import { AwardResult } from '../../../enums/award-result.enum';
import { GameStatus } from '../../../enums/game-status.enum';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Franchise } from '../../../models/franchise.model';
import { FranchisesResponse, FranchisesService } from '../../../services/franchises.service';
import { Serie } from '../../../models/serie.model';
import { AwardCategory } from '../../../models/awardCategory.model';

type AddMethod =  "addGenres" | "addThemes"| "addDirectors"| "addPlatforms"| "addDevelopers" | "addPublishers" | "addPlayableCharacters" | "addAntagonistCharacters" | "addSecondaryCharacters" | "addVillainCharacters";
type RemoveMethod =  "removeGenre" | "removeTheme" | "removeDirector" | "removePlatform" | "removeDeveloper" | "removePublisher" | "removePlayableCharacter" | "removeAntagonistCharacter" | "removeSecondaryCharacter" | "removeVillainCharacter";

@Component({
  selector: 'vgdb-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.scss'
})
export class GameDetailPage implements OnInit, OnDestroy {

  public readonly CharacterRole: typeof CharacterRole = CharacterRole;
  public readonly GameStatus: typeof GameStatus = GameStatus;

  public game: Game;
  public routerSubs: Subscription;
  public cover: boolean = true;
  public owned: boolean = false;
  public companiesDev: Company[] = [];
  public companiesPub: Company[] = [];
  public charactersPlayable: Character[] = [];
  public charactersSecondary: Character[] = [];
  public charactersAntagonist: Character[] = [];
  public charactersVillain: Character[] = [];
  public mainAwards: AwardCategory[] = [];
  public displayedAwardsColumns: string[] = ['Game_Award.year', 'award.name', 'name', 'Game_Award.result'];
  public backgroundStyle: any;
  public hideCharacters = true;
  public statusText: string = 'NO JUGADO';

  public dialog: DialogService;

  public itemsFromSelector: Genre[];

  public franchises: Franchise[];
  public addFranchiseForm: FormGroup;
  public filteredFranchises: Observable<Franchise[]>;
  public franchisesInCurrentSearch: Franchise[];
  public seriesFromFranchise: Serie[];

  public charactersRole: CharacterRole;

  public manageAwardsShowList: boolean = true;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('gameForm') gameForm: TemplateRef<any>;

  @ViewChild('addGenresDialog') addGenresDialog: TemplateRef<any>;
  @ViewChild('addThemesDialog') addThemesDialog: TemplateRef<any>;
  @ViewChild('addDirectorsDialog') addDirectorsDialog: TemplateRef<any>;
  @ViewChild('addPlatformsDialog') addPlatformsDialog: TemplateRef<any>;
  @ViewChild('addDevelopersDialog') addDevelopersDialog: TemplateRef<any>;
  @ViewChild('addPublishersDialog') addPublishersDialog: TemplateRef<any>;

  @ViewChild('addFranchiseDialog') addFranchiseDialog: TemplateRef<any>;
  @ViewChild('franchiseForm') franchiseForm: TemplateRef<any>;
  @ViewChild('removeFranchiseDialog') removeFranchiseDialog: TemplateRef<any>;

  @ViewChild('addCharactersDialog') addCharactersDialog: TemplateRef<any>;

  @ViewChild('manageAwardsDialog') manageAwardsDialog: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private formBuilder: FormBuilder,
    private franchisesService: FranchisesService,
    private gamesService: GamesService,
    private router: Router) {
  }

  ngOnInit() {
    this.cover = true;
    this.loadGame();

    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadGame();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadGame();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteGame() {
    this.closeDialog();
    this.gamesService.deleteGame(this.game.id!).subscribe(result => {
      this.router.navigate(['games']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar juego',
      template: this.gameForm,
      context: this.game
    });
  }

  public onSelectorChange(value: any[]) {
    this.itemsFromSelector = value;
  }

  public presentAddGenresDialog() {
    this.itemsFromSelector = [];
    this.openDialog({
      headerText: 'Añadir géneros',
      template: this.addGenresDialog
    });
  }

  public addGenre() {
    this.addItemSelector(this.game.genres!, 'addGenres', 'removeGenre');
  }

  public presentAddThemesDialog() {
    this.openDialog({
      headerText: 'Añadir temáticas',
      template: this.addThemesDialog
    });
  }

  public addTheme() {
    this.addItemSelector(this.game.themes!, 'addThemes', 'removeTheme');
  }

  public presentAddDirectorsDialog() {
    this.openDialog({
      headerText: 'Añadir directores',
      template: this.addDirectorsDialog
    });
  }

  public addDirector() {
    this.addItemSelector(this.game.directors!, 'addDirectors', 'removeDirector');
  }

  public presentAddPlatformsDialog() {
    this.openDialog({
      headerText: 'Añadir plataformas',
      template: this.addPlatformsDialog
    });
  }

  public addPlatform() {
    this.addItemSelector(this.game.platforms!, 'addPlatforms', 'removePlatform');
  }

  public presentAddDevelopersDialog() {
    this.openDialog({
      headerText: 'Añadir desarrolladoras',
      template: this.addDevelopersDialog
    });
  }

  public addDeveloper() {
    this.addItemSelector(this.companiesDev, 'addDevelopers', 'removeDeveloper');
  }

  public presentAddPublishersDialog() {
    this.openDialog({
      headerText: 'Añadir distribuidoras',
      template: this.addPublishersDialog
    });
  }

  public addPublisher() {
    this.addItemSelector(this.companiesPub, 'addPublishers', 'removePublisher');
  }

  public presentAddFranchiseDialog() {
    this.seriesFromFranchise = [];
    this.franchisesService.getList().subscribe(result => {
      this.addFranchiseForm = this.createFranchiseForm();
      this.franchises = result.franchises;
      this.openDialog({
        headerText: 'Añadir franquicia',
        template: this.addFranchiseDialog
      });

      this.filteredFranchises = this.addFranchiseForm.controls['franchiseId'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.franchisesService.getFilteredList(text):  of({} as FranchisesResponse)),
        map(franchiseRes => (franchiseRes.franchises ? franchiseRes.franchises : this.franchises.slice())),
        tap((franchises) => { this.franchisesInCurrentSearch = franchises} )
      );
    });
  }

  public presentRemoveFranchiseDialog() {
    this.openDialog({
      headerText: 'Desvincular franquicia',
      template: this.removeFranchiseDialog
    });
  }

  public onAddFranchise() {
    let value: any;
    value = this.addFranchiseForm.value;
    this.gamesService.updateGame(this.game.id!, value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public removeFranchise() {
    let value: any;
    value = {franchiseId: null, serieId: null};
    value = value as unknown as Game;
    this.gamesService.updateGame(this.game.id!, value).subscribe(result => {
      this.formSubmitted();
    });
  }

  public displayName(franchises: Franchise[]) {
    return (id: any) => franchises && franchises.length && franchises.find(franchise => franchise.id === id)? franchises.find(franchise => franchise.id === id)!.name : ''; 
  }

  public getSeries(value: number) {
    this.franchisesService.getFranchise(value).subscribe(result => {
      console.log(result)
      this.seriesFromFranchise = result.series!;
    });
  }

  public presentAddCharactersDialog() {
    this.charactersRole = CharacterRole.playable;
    this.openDialog({
      headerText: 'Añadir personajes',
      template: this.addCharactersDialog
    });
  }

  public addCharacter() {
    switch(this.charactersRole) {
      case CharacterRole.playable: 
        this.addItemSelector(this.charactersPlayable, 'addPlayableCharacters', 'removePlayableCharacter');
        break;
      case CharacterRole.secondary: 
        this.addItemSelector(this.charactersSecondary, 'addSecondaryCharacters', 'removeSecondaryCharacter');
        break;
      case CharacterRole.antagonist: 
        this.addItemSelector(this.charactersAntagonist, 'addAntagonistCharacters', 'removeAntagonistCharacter');
        break;
      case CharacterRole.villain: 
        this.addItemSelector(this.charactersVillain, 'addVillainCharacters', 'removeVillainCharacter');
        break;
    }
  }

  public presentManageAwardsDialog() {
    this.manageAwardsShowList = true;
    this.openDialog({
      headerText: 'Gestionar premios',
      template: this.manageAwardsDialog
    });
  }

  public addGameAward() {
    this.manageAwardsShowList = false;
  }

  public deleteAward(award: any) {
    this.gamesService.removeAward(this.game.id!, award).subscribe(result => {
      this.formSubmitted();
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar juego',
      template: this.deleteDialog
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }


  private loadGame() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.gamesService.getGame(id).subscribe(result => {
      console.log('game', result)
      this.game = result;
      if (this.game.companies && this.game.companies.length) {
        this.companiesDev = this.game.companies.filter(company => company.Game_Company?.type === CompanyType.developer);
        this.companiesPub = this.game.companies.filter(company => company.Game_Company?.type === CompanyType.publisher);
      }
      if (this.game.characters && this.game.characters.length) {
        this.charactersPlayable = this.game.characters.filter(character => character.Game_Character?.type === CharacterRole.playable);
        this.charactersSecondary = this.game.characters.filter(character => character.Game_Character?.type === CharacterRole.secondary);
        this.charactersAntagonist = this.game.characters.filter(character => character.Game_Character?.type === CharacterRole.antagonist);
        this.charactersVillain = this.game.characters.filter(character => character.Game_Character?.type === CharacterRole.villain);
      }
      if (this.game.awards && this.game.awards.length) {
        this.mainAwards = this.game.awards.filter(award => award.award?.is_main && award.is_main);
      }
      this.backgroundStyle = this.getBackgroundStyle(this.game);
      this.statusText = this.getStatusText(this.game.personal_status);
    });
  }

  public changeGameOwned(owned: boolean) {
    if (this.game && this.game.id) {
      this.gamesService.updateOwnedGame(this.game.id, owned).subscribe(result => {
        console.log('ok??', result)
        this.game.owned = owned;
      });
    }
  }

  public changeGameStatus(status: GameStatus) {
    if (this.game && this.game.id) {
      this.gamesService.updatePersonalStatus(this.game.id, status).subscribe(result => {
        console.log('status', status);
        this.game.personal_status = status;
        this.statusText = this.getStatusText(this.game.personal_status);
      });
    }
  }

  private getBackgroundStyle(game: Game) {
    return {
      'background-color': game.color? game.color : 'rgb(68, 67, 67)'
    }
  }

  private getStatusText(status?: GameStatus): string {
    switch (status) {
      case GameStatus.completed: 
        return 'COMPLETADO';
      case GameStatus.played:
        return 'JUGADO';
      default:
        return 'NO JUGADO';
    }
  }

  private addItemSelector(arrayToCheck: any[], addMethod: AddMethod, removeMethod: RemoveMethod) {
    this.itemsFromSelector = this.itemsFromSelector ? this.itemsFromSelector : [];
    const itemsToAdd = this.itemsFromSelector.filter(o => !arrayToCheck.some((i: any) => i.id === o.id));
    const itemsToRemove = arrayToCheck.filter(o => !this.itemsFromSelector.some((i: any) => i.id === o.id));
    const observables = [];
    if (itemsToAdd.length) {
      observables.push(this.gamesService[addMethod](this.game.id!, <any>itemsToAdd));
    }
    if (itemsToRemove.length) {
      itemsToRemove.forEach(item => {
        observables.push(this.gamesService[removeMethod](this.game.id!, item));
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

  private createFranchiseForm() {
    return this.formBuilder.group({
      franchiseId: [null, Validators.required],
      serieId: [null, Validators.required]
    });
  }

}