import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class DebugService {
    constructor(private http: HttpClient) {

    }

    ping(){
        this.http.get(`${API_URL}/api/ping`).subscribe((result) => {
            console.log(result);
        });
    }
}
