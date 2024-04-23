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
import { GameStatus } from '../enums/game-status.enum';

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

    public getFilteredList(name:string): Observable<GamesResponse> {
        return this.httpService.get(`http://localhost:3000/games?name=${name}`).pipe(
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

    public updateGame(id: number, game: Game): Observable<any> {
        return this.httpService.put(`http://localhost:3000/games/${id}`, game);
    }

    public deleteGame(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/games/${id}`);
    }

    public addGenres(id: number, genres: Genre[]): Observable<any> {
        const genresIds = genres.map(genre => genre.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addGenres`, genresIds);
    }

    public removeGenre(id: number, genre: Genre): Observable<any> {
        const genreId = genre.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeGenre`, {genreId});
    }

    public addThemes(id: number, themes: Theme[]): Observable<any> {
        const themesIds = themes.map(theme => theme.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addThemes`, themesIds);
    }

    public removeTheme(id: number, theme: Theme): Observable<any> {
        const themeId = theme.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeTheme`, {themeId});
    }

    public addDirectors(id: number, people: Person[]): Observable<any> {
        const directorsIds = people.map(person => person.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addDirectors`, directorsIds);
    }

    public removeDirector(id: number, person: Person): Observable<any> {
        const directorId = person.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeDirector`, {directorId});
    }

    public addPlatforms(id: number, platforms: Platform[]): Observable<any> {
        const platformsIds = platforms.map(platform => platform.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPlatforms`, platformsIds);
    }

    public removePlatform(id: number, platform: Platform): Observable<any> {
        const platformId = platform.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removePlatform`, {platformId});
    }

    public addDevelopers(id: number, companies: Company[]): Observable<any> {
        const companiesIds = companies.map(company => company.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addDevelopers`, companiesIds);
    }

    public removeDeveloper(id: number, company: Company): Observable<any> {
        const companyId = company.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeDeveloper`, {companyId});
    }

    public addPublishers(id: number, companies: Company[]): Observable<any> {
        const companiesIds = companies.map(company => company.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPublishers`, companiesIds);
    }

    public removePublisher(id: number, company: Company): Observable<any> {
        const companyId = company.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removePublisher`, {companyId});
    }

    public addPlayableCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addPlayableCharacters`, charactersIds);
    }

    public removePlayableCharacter(id: number, character: Character): Observable<any> {
        const characterId = character.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removePlayableCharacter`, {characterId});
    }

    public addAntagonistCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addAntagonistCharacters`, charactersIds);
    }

    public removeAntagonistCharacter(id: number, character: Character): Observable<any> {
        const characterId = character.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeAntagonistCharacter`, {characterId});
    }

    public addSecondaryCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addSecondaryCharacters`, charactersIds);
    }

    public removeSecondaryCharacter(id: number, character: Character): Observable<any> {
        const characterId = character.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeSecondaryCharacter`, {characterId});
    }

    public addVillainCharacters(id: number, characters: Character[]): Observable<any> {
        const charactersIds = characters.map(character => character.id);
        return this.httpService.post(`http://localhost:3000/games/${id}/addVillainCharacters`, charactersIds);
    }

    public removeVillainCharacter(id: number, character: Character): Observable<any> {
        const characterId = character.id;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeVillainCharacter`, {characterId});
    }

    public addAwards(id: number, awards: Game_Award[]): Observable<any> {
        return this.httpService.post(`http://localhost:3000/games/${id}/addAwards`, awards);
    }

    public removeAward(id: number, award: Game_Award): Observable<any> {
        const awardCategoryId = award.AwardCategoryId;
        return this.httpService.post(`http://localhost:3000/games/${id}/removeAward`, {awardCategoryId});
    }

    public updateOwnedGame(id: number, owned: boolean): Observable<any> {
        return this.httpService.post(`http://localhost:3000/games/${id}/updateOwnedGame`, {owned});
    }

    public updatePersonalStatus(id: number, personal_status: GameStatus): Observable<any> {
        return this.httpService.post(`http://localhost:3000/games/${id}/updatePersonalStatus`, {personal_status});
    }
}
