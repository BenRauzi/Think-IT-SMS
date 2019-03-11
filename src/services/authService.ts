import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import{ Injectable } from '@angular/core';
import {TestDto, TokenDto } from '../dto';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../environments';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(private http: HttpClient, private router: Router){

    }

    async login(email: string, password: string){

        if(email && password){
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })};
            this.http.post('http://localhost:3000/api/login',{email: email, password: password}, options).subscribe((data: TokenDto) => {
                if(data.token){
                    localStorage.setItem('pt-usertoken', data.token);
                    this.router.navigate(['/dashboard']);
                }
                else{
                    console.log(data);
                }
            }, (e: any) => {
                console.error(e);
            });
        }
        else{
            console.log("email/password empty");
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