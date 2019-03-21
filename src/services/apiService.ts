import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments';

// const API_URL = environment.API_URL;

export class ApiService{
    constructor(){}

    // isTokenExpired(){
    //     const token = localStorage.getItem('pt-usertoken');
    //     const options = { headers: new HttpHeaders({
    //         "Content-Type": "application/json"
    //     })};
    //     return this.http.post(`${API_URL}/api/expired`, token, options);
    // }
}