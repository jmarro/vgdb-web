import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Genre } from '../models/genre.model';

export interface GenresResponse {
    count: number;
    genres: Genre[];
}

@Injectable({
  providedIn: 'root'
})
export class GenresService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<GenresResponse> {
        return this.httpService.get('http://localhost:3000/genres').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    genres: res.rows.map((genre: any) => genre as Genre)
                }
            })
        );
    }

    public getGenre(id: number): Observable<Genre> {
        return this.httpService.get(`http://localhost:3000/genres/${id}`).pipe(
            map((res: any) => {
                return res[0] as Genre;
            })
        );
    }

    public createGenre(genre: Genre): Observable<any> {
        return this.httpService.post('http://localhost:3000/genres', genre);
    }
}
