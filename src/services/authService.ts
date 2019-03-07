import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import{ Injectable } from '@angular/core';
import {TestDto, TokenDto } from '../dto';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(private http: HttpClient){

    }
    login(email: string, password: string){
        // const params = new HttpParams()
        // .set('email', email)
        // .set('password', password);

        const options = {headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })};
        // const params = new HttpParams({''})
        this.http.post('http://localhost:3000/api/login',{email: email, password: password}, options).subscribe((data: TokenDto) => {
            console.log(data.token);
            localStorage.setItem('pt-userid', data.token);
        }, (e: any) => {
            console.error(e);
        });
    }

    verify(){
        const token = localStorage.getItem('pt-userid');
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