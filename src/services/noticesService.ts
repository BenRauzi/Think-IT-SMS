import { Observable } from 'rxjs';
import { environment } from 'src/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.API_URL;
@Injectable({
    providedIn: 'root'
})
export class NoticesService {

    constructor(private http: HttpClient) {}

    write() {
        const options = { headers: new HttpHeaders({
                'Content-Type': 'application/json'
        })};
        // tslint:disable-next-line: max-line-length
        return this.http.post(`${API_URL}/api/notices`, { title: 'Test Notice!', information: 'This is a Test Notice that is being Tested'}, options);
    }

    read() {
        return this.http.get(`${API_URL}/api/notices`);
    }
}
