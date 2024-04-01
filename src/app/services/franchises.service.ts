import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Franchise } from '../models/franchise.model';
import { Person } from '../models/person.model';

export interface FranchisesResponse {
    count: number;
    franchises: Franchise[];
}

@Injectable({
  providedIn: 'root'
})
export class FranchisesService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<FranchisesResponse> {
        return this.httpService.get('http://localhost:3000/franchises').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    franchises: res.rows.map((franchise: any) => franchise as Franchise)
                }
            })
        );
    }

    public getFilteredList(name:string): Observable<FranchisesResponse> {
        return this.httpService.get(`http://localhost:3000/franchises?name=${name}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    franchises: res.rows.map((franchise: any) => franchise as Franchise)
                }
            })
        );
    }

    public getFranchise(id: number): Observable<Franchise> {
        return this.httpService.get(`http://localhost:3000/franchises/${id}`).pipe(
            map((res: any) => {
                return res[0] as Franchise;
            })
        );
    }

    public createFranchise(franchise: Franchise): Observable<any> {
        return this.httpService.post('http://localhost:3000/franchises', franchise);
    }

    public addCreators(id: number, creators: Person[]): Observable<any> {
        const creatorsIds = creators.map(creator => creator.id);
        return this.httpService.post(`http://localhost:3000/franchises/${id}/addCreators`, creatorsIds);
    }
}