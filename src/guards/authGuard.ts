import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService, ApiService } from '../services';
import { Observable, pipe, of } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseModel } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments';
// import { Base } from '../models';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private api: ApiService, private http: HttpClient){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        // // return true;
        // const currentUser = localStorage.getItem('pt-usertoken');
        // if(currentUser){
        //     // this.auth.authenticateToken(currentUser).subscribe((data: any) => {
        //         return this.auth.authenticateToken(currentUser).pipe(map((data: BaseModel) => {
        //             if(data.msg === "Token Expired"){
        //                 localStorage.removeItem('pt-usertoken');
        //                 // this.router.navigate(['/login']);
        //                 console.log("TOKEN EXISTS BUT IS INVALID");
        //                 return true;
        //             }
        //             else{
        //                 console.log("TOKEN EXISTS AND IS VALID");
        //                 return true;
        //             }
        //         }));
        //     // });
        // }
        // else{
        //             // not logged in so redirect to login page with the return url
        //             console.log("TOKEN DOES NOT EXIST!!!");
        // // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // // return false;
        // return true;
        const currentUser = localStorage.getItem('pt-usertoken');
        if(currentUser){
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })};
            return this.http.post(`${API_URL}/api/authenticate`, {token: currentUser}, options).pipe(
                map(res => {
                    if(res['msg'] === "Token Expired"){
                        this.router.navigate(['/login']);
                        return false;
                    }
                    else{
                        return true;
                    }
                })
            )
        }
        else{
            this.router.navigate(['/login']);
            return of(false);
        }
    }
}