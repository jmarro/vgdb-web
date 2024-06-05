import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Company } from '../models/company.model';

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
        return this.httpService.get(`http://localhost:3000/companies?name=${name}&page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    companies: res.rows.map((company: any) => company as Company)
                }
            })
        );
    }

    public getCompany(id: number): Observable<Company> {
        return this.httpService.get(`http://localhost:3000/companies/${id}`).pipe(
            map((res: any) => {
                return res[0] as Company;
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
}