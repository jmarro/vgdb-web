import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Platform } from '../models/platform.model';
import { PlatformModel } from '../models/platformModel.model';

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

    public getList(page?: number): Observable<PlatformsResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/platforms?page=${pageNumber}`).pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    platforms: res.rows.map((platform: any) => platform as Platform)
                }
            })
        );
    }

    public getFilteredList(name:string, page?: number): Observable<PlatformsResponse> {
        let pageNumber = page || 0;
        return this.httpService.get(`http://localhost:3000/platforms?name=${name}&page=${pageNumber}`).pipe(
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

    public updatePlatform(id: number, platform: Platform): Observable<any> {
        return this.httpService.put(`http://localhost:3000/platforms/${id}`, platform);
    }

    public deletePlatform(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/platforms/${id}`);
    }
}