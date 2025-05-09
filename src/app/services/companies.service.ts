import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Company } from '../models/company.model';
import { Person } from '../models/person.model';

export interface CompaniesResponse {
    count: number;
    companies: Company[];
}

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(page?: number): Observable<CompaniesResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/companies?page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    companies: res.rows.map((company: any) => company as Company)
                }
            })
        );
    }

    public getFilteredList(name:string, page?: number): Observable<CompaniesResponse> {
        let pageNumber = page || 0;
        let nameEncoded = encodeURIComponent(name);
        return this.httpService.get(`http://localhost:3000/companies?name=${nameEncoded}&page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    companies: res.rows.map((company: any) => company as Company)
                }
            })
        );
    }

    public getCompany(id: number, pageDeveloped?: number, pagePublished?: number): Observable<Company> {
        let pageDevelopedNumber = pageDeveloped || 0;
        let pagePublishedNumber = pagePublished || 0;
        return this.httpService.get(`http://localhost:3000/companies/${id}?pageDeveloped=${pageDevelopedNumber}&pagePublished=${pagePublishedNumber}`).pipe(
            map((res: any) => {
                let company = res.companies[0];
                if (!!res.games_developed.count) {
                    company.games_developed = res.games_developed.rows;
                    company.total_games_developed = res.games_developed.count;
                }
                if (!!res.games_published.count) {
                    company.games_published = res.games_published.rows;
                    company.total_games_published = res.games_published.count;
                }
                return company as Company;
            })
        );
    }

    public createCompany(company: Company): Observable<any> {
        return this.httpService.post('http://localhost:3000/companies', company);
    }

    public updateCompany(id: number, company: Company): Observable<any> {
        return this.httpService.put(`http://localhost:3000/companies/${id}`, company);
    }

    public deleteCompany(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/companies/${id}`);
    }

    public addPeople(id: number, people: Person[]): Observable<any> {
        const peopleIds = people.map(person => person.id);
        return this.httpService.post(`http://localhost:3000/companies/${id}/addPeople`, peopleIds);
    }

    public removePerson(id: number, person: Person): Observable<any> {
        const personId = person.id;
        return this.httpService.post(`http://localhost:3000/companies/${id}/removePerson`, {personId});
    }
}