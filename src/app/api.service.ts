import { Injectable } from '@angular/core';
import {Todo} from './todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getTodo(){
    return this.http.get<Todo>(this.apiURL + '/todos');
  }
}
