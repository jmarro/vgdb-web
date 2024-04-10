import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Theme } from '../models/theme.model';

export interface ThemesResponse {
    count: number;
    themes: Theme[];
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<ThemesResponse> {
        return this.httpService.get('http://localhost:3000/themes').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    themes: res.rows.map((theme: any) => theme as Theme)
                }
            })
        );
    }

    public getFilteredList(name:string): Observable<ThemesResponse> {
        return this.httpService.get(`http://localhost:3000/themes?name=${name}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    themes: res.rows.map((theme: any) => theme as Theme)
                }
            })
        );
    }


    public getTheme(id: number): Observable<Theme> {
        return this.httpService.get(`http://localhost:3000/themes/${id}`).pipe(
            map((res: any) => {
                return res[0] as Theme;
            })
        );
    }

    public createTheme(theme: Theme): Observable<any> {
        return this.httpService.post('http://localhost:3000/themes', theme);
    }

    public updateTheme(id: number, theme: Theme): Observable<any> {
        return this.httpService.put(`http://localhost:3000/themes/${id}`, theme);
    }

    public deleteTheme(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/themes/${id}`);
    }
}
