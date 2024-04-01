import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person } from '../models/person.model';

export interface PeopleResponse {
    count: number;
    people: Person[];
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<PeopleResponse> {
        return this.httpService.get('http://localhost:3000/people').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    people: res.rows.map((person: any) => person as Person)
                }
            })
        );
    }

    public getFilteredList(name:string): Observable<PeopleResponse> {
        return this.httpService.get(`http://localhost:3000/people?name=${name}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    people: res.rows.map((person: any) => person as Person)
                }
            })
        );
    }

    public getPerson(id: number): Observable<Person> {
        return this.httpService.get(`http://localhost:3000/people/${id}`).pipe(
            map((res: any) => {
                return res[0] as Person;
            })
        );
    }

    public createPerson(person: Person): Observable<any> {
        return this.httpService.post('http://localhost:3000/people', person);
    }

    public updatePerson(id: number, person: Person): Observable<any> {
        return this.httpService.put(`http://localhost:3000/people/${id}`, person);
    }

    public deletePerson(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/people/${id}`);
    }
}