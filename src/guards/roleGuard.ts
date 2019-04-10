import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, ApiService } from 'src/services';
import { Injectable } from '@angular/core';
import { UserDto } from 'src/dto';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate{

    constructor(private auth: AuthService, private router: Router, private api: ApiService){}

    canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean>{
        const role = route.data['role'];
        if(!this.auth.user.role){
            return this.auth.updateRole().pipe(map((data: UserDto) => {
                this.auth.user = data;
                return this.checkPermissions(role);
            }));
        }
        else{
            this.checkPermissions(role);
        }
    }

    checkPermissions(role){
        if(role === this.auth.user.role){
            return true;
        }
        else if(this.auth.user.role === "Administrator"){
            return true;
        }
        else{
            console.log("Rerouting to dashobard roleguard");
            this.router.navigate(['/dashboard']);
            return false;
        }
    }

}