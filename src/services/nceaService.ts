import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class NceaService{

    constructor(private http: HttpClient){

    }

    public getTotalCredits(){
        return this.http.get(`${API_URL}/api/student/credits/totals`);
    }
}