import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import{ Injectable } from '@angular/core';
import {TestDto, TokenDto, UserDto } from '../dto';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../environments';
import { Router } from '@angular/router';
import { Observable } from '../../node_modules/rxjs';
// import { BaseModel } from '../models';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(private http: HttpClient, private router: Router){

    }

    user: UserDto = {
        role: null
    };

    public login(username: string, password: string){
        if(username && password){
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })};
            return this.http.post(`${API_URL}/api/login`,{username: username, password: password}, options).pipe(map(data => data));
        }
    }

    authenticateToken(token){
        const options = {headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })};
        if(token){
            return this.http.post(`${API_URL}/api/authenticate`,{token: token}, options);
        }
        else{
            console.log("No token exists!");
        }
    }

    verify(){
        const token = localStorage.getItem('pt-usertoken');
        if(token){
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': token
            })};
            this.http.post(`${API_URL}/api/verify`, {}).pipe(retry(3)).subscribe(data => {
                console.log(data);
            });
        }
    }
}