import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { CharactersService } from '../../../services/characters.service';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { Game } from '../../../models/game.model';
import { CharacterRole } from '../../../enums/character-role.enum';

@Component({
  selector: 'vgdb-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit, OnDestroy {

  public character: Character;
  public routerSubs: Subscription;

  public gamesPlayable: Game[] = [];
  public gamesSecondary: Game[] = [];
  public gamesAntagonist: Game[] = [];
  public gamesVillain: Game[] = [];
  public backgroundStyle: any;

  constructor(private charactersService: CharactersService,
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

}

