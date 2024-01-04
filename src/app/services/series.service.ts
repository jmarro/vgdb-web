import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Serie } from '../models/serie.model';

export interface SeriesResponse {
    count: number;
    series: Serie[];
}

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<SeriesResponse> {
        return this.httpService.get('http://localhost:3000/series').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    series: res.rows.map((serie: any) => serie as Serie)
                }
            })
        );
    }

    public getSerie(id: number): Observable<Serie> {
        return this.httpService.get(`http://localhost:3000/series/${id}`).pipe(
            map((res: any) => {
                return res[0] as Serie;
            })
        );
    }

    public createSerie(serie: Serie): Observable<any> {
        return this.httpService.post('http://localhost:3000/series', serie);
    }
}
