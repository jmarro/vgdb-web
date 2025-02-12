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

    public getList(page?: number): Observable<FranchisesResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/franchises?page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    franchises: res.rows.map((franchise: any) => franchise as Franchise)
                }
            })
        );
    }

    public getFilteredList(name:string, page?: number): Observable<FranchisesResponse> {
        let pageNumber = page || 0;
        let nameEncoded = encodeURIComponent(name);
        return this.httpService.get(`http://localhost:3000/franchises?name=${nameEncoded}&page=${pageNumber}`).pipe(
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

    public updateFranchise(id: number, franchise: Franchise): Observable<any> {
        return this.httpService.put(`http://localhost:3000/franchises/${id}`, franchise);
    }

    public deleteFranchise(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/franchises/${id}`);
    }

    public addCreators(id: number, creators: Person[]): Observable<any> {
        const creatorsIds = creators.map(creator => creator.id);
        return this.httpService.post(`http://localhost:3000/franchises/${id}/addCreators`, creatorsIds);
    }

    public removeCreator(id: number, creator: Person): Observable<any> {
        const creatorId = creator.id;
        return this.httpService.post(`http://localhost:3000/franchises/${id}/removeCreator`, {creatorId});
    }

    public addParentFranchises(id: number, franchises: Franchise[]): Observable<any> {
        const franchisesIds = franchises.map(franchise => franchise.id);
        return this.httpService.post(`http://localhost:3000/franchises/${id}/addParentFranchises`, franchisesIds);
    }

    public removeParentFranchise(id: number, franchise: Franchise): Observable<any> {
        const franchiseId = franchise.id;
        return this.httpService.post(`http://localhost:3000/franchises/${id}/removeParentFranchise`, {franchiseId});
    }
}