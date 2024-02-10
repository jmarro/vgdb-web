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

    public getList(): Observable<AwardsResponse> {
        return this.httpService.get('http://localhost:3000/awards').pipe(
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

    public createAwardCategory(awardCategory: AwardCategory): Observable<any> {
        return this.httpService.post('http://localhost:3000/awards/category', awardCategory);
    }
}
