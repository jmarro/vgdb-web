import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Game } from '../models/game.model';
import { Genre } from '../models/genre.model';
import { Theme } from '../models/theme.model';
import { Person } from '../models/person.model';
import { Platform } from '../models/platform.model';
import { Company } from '../models/company.model';
import { Character } from '../models/character.model';
import { Game_Award } from '../models/game_award.model';

export interface GamesResponse {
    count: number;
    games: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<GamesResponse> {
        return this.httpService.get('http://localhost:3000/games').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    games: res.rows.map((game: any) => game as Game)
                }
            })
        );
    }

    public getGame(id: number): Observable<Game> {
        return this.httpService.get(`http://localhost:3000/games/${id}`).pipe(
            map((res: any) => {
                return res[0] as Game;
            })
        );
    }

    public createGame(game: Game): Observable<any> {
        return this.httpService.post('http://localhost:3000/games', game);
    }

    public addGenres(id: number, genres: Genre[]): Observable<any> {
        const genresIds = genres.map(genre => genre.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addGenres`, genresIds);
    }

    public addThemes(id: number, themes: Theme[]): Observable<any> {
        const themesIds = themes.map(theme => theme.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addThemes`, themesIds);
    }

    public addDirectors(id: number, people: Person[]): Observable<any> {
        const directorsIds = people.map(person => person.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addDirectors`, directorsIds);
    }

    public addPlatforms(id: number, platforms: Platform[]): Observable<any> {
        const platformsIds = platforms.map(platform => platform.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPlatforms`, platformsIds);
    }


    public addDevelopers(id: number, companies: Company[]): Observable<any> {
        const companiesIds = companies.map(company => company.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addDevelopers`, companiesIds);
    }

    public addPublishers(id: number, companies: Company[]): Observable<any> {
        const companiesIds = companies.map(company => company.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPublishers`, companiesIds);
    }

    public addPlayableCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPlayableCharacters`, charactersIds);
    }

    public addAntagonistCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addAntagonistCharacters`, charactersIds);
    }

    public addSecondaryCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addSecondaryCharacters`, charactersIds);
    }

    public addVillainCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addVillainCharacters`, charactersIds);
    }

    public addAwards(id: number, awards: Game_Award[]): Observable<any> {
        return this.httpService.post(`http://localhost:3000/games/${id}/addAwards`, awards);
    }
}
