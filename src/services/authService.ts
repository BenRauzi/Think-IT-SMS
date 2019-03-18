import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import{ Injectable } from '@angular/core';
import {TestDto, TokenDto } from '../dto';
import { retry, catchError } from 'rxjs/operators';
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

    async login(username: string, password: string){
        console.log("test");
        if(username && password){
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })};
            this.http.post('http://localhost:3000/api/login',{username: username, password: password}, options).subscribe((data: TokenDto) => {
                if(data.token){
                    localStorage.setItem('pt-usertoken', data.token);
                    console.log("time to rerout!");
                    this.router.navigate(['/dashboard']);
                }
                else{
                    console.log(data);
                }
            }, (e: any) => {
                console.error(e);
            });
        }
    }

    authenticateToken(token){
        const options = {headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })};
        if(token){
            return this.http.post('http://localhost:3000/api/authenticate',{token: token}, options);
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
            this.http.post('http://localhost:3000/api/verify', {}).pipe(retry(3)).subscribe(data => {
                console.log(data);
            });
        }
    }
}