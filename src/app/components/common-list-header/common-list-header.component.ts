import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CharactersService } from '../../services/characters.service';
import { CompaniesService } from '../../services/companies.service';
import { FranchisesService } from '../../services/franchises.service';
import { GamesService } from '../../services/games.service';
import { GenresService } from '../../services/genres.service';
import { PeopleService } from '../../services/people.service';
import { PlatformsService } from '../../services/platforms.service';
import { ThemesService } from '../../services/themes.service';
import { FormControl } from '@angular/forms';
import { map, mergeMap, Observable, of, startWith } from 'rxjs';
import { AwardsService } from '../../services/awards.service';

@Component({
  selector: 'vgdb-common-list-header',
  templateUrl: './common-list-header.component.html',
  styleUrl: './common-list-header.component.scss'
})
export class CommonListHeaderComponent implements OnInit {

  @Input('dataType') dataType: any;

  @Output() dialogNewOpen: EventEmitter<boolean> = new EventEmitter();
  @Output() dialogFilterOpen: EventEmitter<boolean> = new EventEmitter();
  @Output() toSearch: EventEmitter<string> = new EventEmitter();
  @Output() toNavigate: EventEmitter<string> = new EventEmitter();

  formCtrl = new FormControl();
  filteredItems: Observable<any[]>;

  public searchTerm: string;
  allItems: any[] = [];
  itemsSelected: any[] = [];
  imgPath: string;
  propertyResponse: string;

  constructor(private charactersService: CharactersService,
    private companiesService: CompaniesService,
    private awardsService: AwardsService,
    private gamesService: GamesService,
    private genresService: GenresService,
    private franchisesService: FranchisesService,
    private peopleService: PeopleService,
    private platformsService: PlatformsService,
    private themesService: ThemesService) {

      this.filteredItems = this.formCtrl.valueChanges.pipe(
        startWith(null),
        mergeMap(text => text? this.getFilterService(text) :  of({})),
        map((item: any) => item ? this.selectableItems(this.valuesFromFilter(item)) : this.selectableItems(this.allItems).slice()));
  }

  ngOnInit(): void {
    switch (this.dataType) {
      case 'award':
        this.imgPath = 'awards';
        this.propertyResponse = 'awards';
        this.awardsService.getList().subscribe(result => {
          this.allItems = result.awards;
        });
      break;
      case 'character':
        this.imgPath = 'characters';
        this.propertyResponse = 'characters';
        this.charactersService.getList().subscribe(result => {
          this.allItems = result.characters;
        });
      break;
      case 'company':
        this.imgPath = 'companies';
        this.propertyResponse = 'companies';
        this.companiesService.getList().subscribe(result => {
          this.allItems = result.companies;
        });
      break;
      case 'game':
        this.imgPath = 'games';
        this.propertyResponse = 'games';
        this.gamesService.getList().subscribe(result => {
          this.allItems = result.games;
        });
      break;
      case 'genre':
        this.imgPath = 'genres';
        this.propertyResponse = 'genres';
        this.genresService.getList().subscribe(result => {
          this.allItems = result.genres;
        });
      break;
      case 'franchise':
        this.imgPath = 'franchises';
        this.propertyResponse = 'franchises';
        this.franchisesService.getList().subscribe(result => {
          this.allItems = result.franchises;
        });
      break;
      case 'person':
        this.imgPath = 'people';
        this.propertyResponse = 'people';
        this.peopleService.getList().subscribe(result => {
          this.allItems = result.people;
        });
      break;
      case 'platform':
        this.imgPath = 'platforms';
        this.propertyResponse = 'platforms';
        this.platformsService.getList().subscribe(result => {
          this.allItems = result.platforms;
        });
      break;
      case 'theme':
        this.imgPath = 'themes';
        this.propertyResponse = 'themes';
        this.themesService.getList().subscribe(result => {
          this.allItems = result.themes;
        });
      break;
    }
  }

  public dispatchDialog() {
    this.dialogNewOpen.emit(true);
  }

  public dispatchFilters() {
    this.dialogFilterOpen.emit(true);
  }

  public search() {
    this.toSearch.emit(this.searchTerm);
  }

  public keyup(event: any) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  public navigateTo(item: any) {
    this.searchTerm = item.name;
    this.toNavigate.emit(item.id);
  }

  private selectableItems(items: any[]): any[] {
    if (items && items.length) {
      return items.filter(o => !this.itemsSelected.some((i: any) => i.id === o.id));
    } else {
      return [];
    }
    
  }

  private getFilterService(text: string) {
    switch (this.dataType) {
      case 'character':
        return this.charactersService.getFilteredList(text);
      case 'company':
        return this.companiesService.getFilteredList(text);
      case 'franchise':
        return this.franchisesService.getFilteredList(text);
      case 'game':
        return this.gamesService.getFilteredList(text);
      case 'genre':
        return this.genresService.getFilteredList(text);
      case 'person':
        return this.peopleService.getFilteredList(text);
      case 'platform':
        return this.platformsService.getFilteredList(text);
      case 'theme':
        return this.themesService.getFilteredList(text);
      case 'award':
        return this.awardsService.getFilteredList(text);
      default:
        return of({});
    }
  }

  private valuesFromFilter(value: any): any[] {
    return value[this.propertyResponse];
  }


}