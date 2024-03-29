import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class HttpinterceptorService implements HttpInterceptor {

    constructor(public _baseService: BaseService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this._baseService.getToken().token}`,
                // Authorization: 'Basic YWRtaW46YWRtaW4=',
                 'Content-Type': 'application/json',
                //   'Access-Control-Allow-Origin': '*',
                'withCredentials': 'true'
            }
        });

        return next.handle(request);
    }
}
