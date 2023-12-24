import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Platform } from '../models/platform.model';

export interface PlatformsResponse {
    count: number;
    platforms: Platform[];
}

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<PlatformsResponse> {
        return this.httpService.get('http://localhost:3000/platforms').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    platforms: res.rows.map((platform: any) => platform as Platform)
                }
            })
        );
    }

    public getPlatform(id: number): Observable<Platform> {
        return this.httpService.get(`http://localhost:3000/platforms/${id}`).pipe(
            map((res: any) => {
                return res[0] as Platform;
            })
        );
    }

    public createPlatform(platform: Platform): Observable<any> {
        return this.httpService.post('http://localhost:3000/platforms', platform);
    }
}