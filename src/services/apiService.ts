import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/models';
import { AuthService } from './authService';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    constructor(private http: HttpClient, private auth: AuthService){}

    getUser(){
        return this.http.get(`${API_URL}/api/getuser`);
    }
}