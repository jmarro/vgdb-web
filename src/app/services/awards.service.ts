import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Award } from '../models/award.model';
import { AwardCategory } from '../models/awardCategory.model';

export interface AwardsResponse {
    count: number;
    awards: Award[];
}

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(page?: number): Observable<AwardsResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/awards?page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    awards: res.rows.map((award: any) => award as Award)
                }
            })
        );
    }

    public getFilteredList(name:string, page?: number): Observable<AwardsResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/awards?name=${name}&page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    awards: res.rows.map((award: any) => award as Award)
                }
            })
        );
    }


    public getAward(id: number): Observable<Award> {
        return this.httpService.get(`http://localhost:3000/awards/${id}`).pipe(
            map((res: any) => {
                return res[0] as Award;
            })
        );
    }

    public createAward(award: Award): Observable<any> {
        return this.httpService.post('http://localhost:3000/awards', award);
    }

    public updateAward(id: number, award: Award): Observable<any> {
        return this.httpService.put(`http://localhost:3000/awards/${id}`, award);
    }

    public deleteAward(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/awards/${id}`);
    }
}
