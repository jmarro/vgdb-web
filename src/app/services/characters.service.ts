import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.model';
import { Person } from '../models/person.model';

export interface CharactersResponse {
    count: number;
    characters: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(page?: number): Observable<CharactersResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/characters?page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    characters: res.rows.map((character: any) => character as Character)
                }
            })
        );
    }

    public getFilteredList(name:string, page?: number): Observable<CharactersResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/characters?name=${name}&page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    characters: res.rows.map((character: any) => character as Character)
                }
            })
        );
    }

    public getCharacter(id: number): Observable<Character> {
        return this.httpService.get(`http://localhost:3000/characters/${id}`).pipe(
            map((res: any) => {
                return res[0] as Character;
            })
        );
    }

    public createCharacter(character: Character): Observable<any> {
        return this.httpService.post('http://localhost:3000/characters', character);
    }

    public updateCharacter(id: number, person: Character): Observable<any> {
        return this.httpService.put(`http://localhost:3000/characters/${id}`, person);
    }

    public deleteCharacter(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/characters/${id}`);
    }

    public addCreators(id: number, creators: Person[]): Observable<any> {
        const creatorsIds = creators.map(creator => creator.id);
        return this.httpService.post(`http://localhost:3000/characters/${id}/addCreators`, creatorsIds);
    }

    public removeCreator(id: number, creator: Person): Observable<any> {
        const creatorId = creator.id;
        return this.httpService.post(`http://localhost:3000/characters/${id}/removeCreator`, {creatorId});
    }
}