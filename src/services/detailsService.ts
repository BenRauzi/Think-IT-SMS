import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../environments';
import { Router } from '@angular/router';
import { Observable } from '../../node_modules/rxjs';
import { Student } from 'src/models';
// import { BaseModel } from '../models';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class DetailsService{

    constructor(private http: HttpClient, private router: Router){

    }

    public getStudents(){
        return this.http.get(`${API_URL}/api/student/names`);
    }

    getStudentDetails(userId){
        const options = {headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })};
        return this.http.post(`${API_URL}/api/student/details`, {userId}, options);
    }

    getStudentDetailsAsStudent(){
        return this.http.get(`${API_URL}/api/student/details`);
    }

    setStudentDetails(student){
        const options = {headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })};
        return this.http.put(`${API_URL}/api/student/details`, student, options);
    }
}