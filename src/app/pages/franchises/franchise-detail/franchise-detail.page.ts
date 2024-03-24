import { Component, OnDestroy, OnInit } from '@angular/core';
import { Franchise } from '../../../models/franchise.model';
import { Subscription, filter } from 'rxjs';
import { FranchisesService } from '../../../services/franchises.service';
import { NavigationEnd, Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { SeriesService } from '../../../services/series.service';
import { Serie } from '../../../models/serie.model';
import { CharacterRole } from '../../../enums/character-role.enum';
import { Character } from '../../../models/character.model';

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

  constructor(private franchisesService: FranchisesService,
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

  public create() {
    console.log('create')
    const creators = [{id: 1, name: 'vla'}, {id: 2}, {id: 3}] as Person[];
    if (this.franchise && this.franchise.id) {
      this.franchisesService.addCreators(this.franchise.id, creators).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public createSerie() {
    console.log('create ser')
    const newplatform: Serie = {
      name: 'Sonic Genesis series',
      franchise_id: 1,
      is_main: true
    }
    this.seriesService.createSerie(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


  private loadFranchise() {
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

}