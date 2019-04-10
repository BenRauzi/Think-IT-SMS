import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService, ApiService } from '../services';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseModel } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments';
import { UserDto } from 'src/dto';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private api: ApiService, private http: HttpClient) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const currentUser = localStorage.getItem('pt-usertoken');
        if (currentUser) {
            if (!this.auth.user.role) {
                this.auth.updateRole().subscribe((data: UserDto) => {
                    this.auth.user = data;
                });
            } else {
                console.log(this.auth.user);
            }
            const options = {headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })};
            return this.http.post(`${API_URL}/api/authenticate`, {token: currentUser}, options).pipe(
                map((res: BaseModel) => {
                    if (res.msg === 'Token Expired') {
                        this.router.navigate(['/login']);
                        return false;
                    } else {
                        return true;
                    }
                })
            );
        } else {
            this.router.navigate(['/login']);
            return of(false);
        }
    }
}
