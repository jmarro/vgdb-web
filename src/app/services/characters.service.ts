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

    public getList(): Observable<CharactersResponse> {
        return this.httpService.get('http://localhost:3000/characters').pipe(
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

    public addCreators(id: number, creators: Person[]): Observable<any> {
        const creatorsIds = creators.map(creator => creator.id);
        return this.httpService.post(`http://localhost:3000/characters/${id}/addCreators`, creatorsIds);
    }
}