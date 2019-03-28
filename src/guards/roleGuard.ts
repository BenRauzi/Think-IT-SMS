import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate{

    constructor(private auth: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot): boolean{
        const role = route.data['role'];
        if(role === this.auth.user.role){
            return true;
        }
        else if(this.auth.user.role === "Administrator"){
            return true;
        }
        else{
            console.log(role);
            this.router.navigate(['/dashboard']);
            return false;
        }
    }

}