import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PlatformModel } from '../models/platformModel.model';

export interface ModelsResponse {
    count: number;
    models: PlatformModel[];
}

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

    constructor(private httpService: HttpClient) { 
    }

    public getList(): Observable<ModelsResponse> {
        return this.httpService.get('http://localhost:3000/models').pipe(
            map((res: any) => {
                return {
                    count: res.count,
                    models: res.rows.map((model: any) => model as PlatformModel)
                }
            })
        );
    }

    public getModel(id: number): Observable<PlatformModel> {
        return this.httpService.get(`http://localhost:3000/models/${id}`).pipe(
            map((res: any) => {
                return res[0] as PlatformModel;
            })
        );
    }

    public createModel(model: PlatformModel): Observable<any> {
        return this.httpService.post('http://localhost:3000/models', model);
    }

    public updateModel(id: number, model: PlatformModel): Observable<any> {
        return this.httpService.put(`http://localhost:3000/models/${id}`, model);
    }

    public deleteModel(id: number): Observable<any> {
        return this.httpService.delete(`http://localhost:3000/models/${id}`);
    }
}
