import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { CharactersService } from '../../../services/characters.service';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'vgdb-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit, OnDestroy {

  public character: Character;
  public routerSubs: Subscription;

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
      console.log('hpl')
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
      this.backgroundStyle = this.getBackgroundStyle(this.character);
    });
  }

  private getBackgroundStyle(character: Character) {
    return {
      'background-color': character.color? character.color : 'rgb(68, 67, 67)'
    }
  }

}

