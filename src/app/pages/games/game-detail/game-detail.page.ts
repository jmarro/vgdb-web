import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Game } from '../../../models/game.model';
import { GamesService } from '../../../services/games.service';
import { Genre } from '../../../models/genre.model';
import { Person } from '../../../models/person.model';
import { Platform } from '../../../models/platform.model';
import { Company } from '../../../models/company.model';
import { CompanyType } from '../../../enums/company-type.enum';
import { Character } from '../../../models/character.model';
import { CharacterRole } from '../../../enums/character-role.enum';
import { Game_Award } from '../../../models/game_award.model';
import { AwardResult } from '../../../enums/award-result.enum';


@Component({
  selector: 'vgdb-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.scss'
})
export class GameDetailPage implements OnInit, OnDestroy {

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
  public backgroundStyle: any;

  constructor(private gamesService: GamesService,
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
      this.backgroundStyle = this.getBackgroundStyle(this.game);
    });
  }

  private getBackgroundStyle(game: Game) {
    return {
      'background-color': game.color? game.color : 'rgb(68, 67, 67)'
    }
  }
 

  public gameOwned(e: any) {
    console.log(e);
  }

  public addGenre() {
    console.log('addgenre')
    const genres = [{id: 2}] as Genre[];
    if (this.game && this.game.id) {
      this.gamesService.addGenres(this.game.id, genres).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addDirectors() {
    console.log('addDirectors')
    const people = [{id: 1}] as Person[];
    if (this.game && this.game.id) {
      this.gamesService.addDirectors(this.game.id, people).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addPlatforms() {
    console.log('addPlatforms')
    const platforms = [{id: 2}] as Platform[];
    if (this.game && this.game.id) {
      this.gamesService.addPlatforms(this.game.id, platforms).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addDevelopers() {
    console.log('addDevelopers')
    const company = [{id: 2}] as Company[];
    if (this.game && this.game.id) {
      this.gamesService.addDevelopers(this.game.id, company).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addPublishers() {
    console.log('addPublishers')
    const company = [{id: 1}] as Company[];
    if (this.game && this.game.id) {
      this.gamesService.addPublishers(this.game.id, company).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addPlayable() {
    console.log('addPlayable')
    const character = [{id: 1}] as Character[];
    if (this.game && this.game.id) {
      this.gamesService.addPlayableCharacters(this.game.id, character).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addAntagonist() {
    console.log('addAntagonist')
    const character = [{id: 2}] as Character[];
    if (this.game && this.game.id) {
      this.gamesService.addAntagonistCharacters(this.game.id, character).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public addAwards() {
    if (this.game && this.game.id) {
      const awards: Game_Award[] = [{AwardCategoryId: 1, year: 1991, GameId: this.game.id, result: AwardResult.winner}];
      this.gamesService.addAwards(this.game.id, awards).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

}