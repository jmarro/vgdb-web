import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AwardCategory } from '../models/awardCategory.model';

export interface AwardsCategoryResponse {
    count: number;
    categories: AwardCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class AwardsCategoryService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<AwardsCategoryResponse> {
        return this.httpService.get('http://localhost:3000/awards-category').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    categories: res.rows.map((category: any) => category as AwardCategory)
                }
            })
        );
    }

    public getCategory(id: number): Observable<AwardCategory> {
        return this.httpService.get(`http://localhost:3000/awards-category/${id}`).pipe(
            map((res: any) => {
                return res[0] as AwardCategory;
            })
        );
    }

    public createCategory(category: AwardCategory): Observable<any> {
        return this.httpService.post('http://localhost:3000/awards-category', category);
    }

    public updateCategory(id: number, category: AwardCategory): Observable<any> {
        return this.httpService.put(`http://localhost:3000/awards-category/${id}`, category);
    }

    public deleteCategory(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/awards-category/${id}`);
    }
}
