import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService, ApiService } from '../services';
// import { Base } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthService, private api: ApiService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = localStorage.getItem('pt-usertoken');
        if (currentUser) {
            // authorised so return true
            this.api.isTokenExpired().subscribe((data: any) => {
                if(data.msg == "expired"){
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                }
            }, (e: any) => {
                console.log(e);
            });
            
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}