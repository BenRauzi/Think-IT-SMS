import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private injector: Injector, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        const authReq = req.clone({
        headers: req.headers.set('Authorization', this.getToken())
            .append('Access-Control-Allow-Origin', '*')
        }); 
        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            // do stuff with response if you want
        }
        }, (response: HttpErrorResponse) => { }));
    }

    getToken(){
        return localStorage.getItem('pt-userid');
    }
    

}