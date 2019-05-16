import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(
        public _baseService: BaseService,
        public _route: Router,
        private httpClient: HttpClient
    ) { }

    canActivate(): boolean {
        // return this._baseService.isSessionExpired();
        if (this._baseService.isSessionExpired()) {
            // this.checkBranch().subscribe(
            //     results => {
            //         console.log('result', results);
            //         if (results === false){
            //             this._route.navigate(['/app/setup/branches']);
            //         }
            //     },
            //     error => {
            //         console.log (error);
            //     }
            //);
            return true;
            /* Going forward, we have to check ifthe called Menu is in the list of Menus for the user */
        }

        this._route.navigate(['/login']);
        // this._route.navigate(['/app/dashboard']);
        // location.reload();
        return false;
    }

    // checkBranch(): any{
    //     return this.httpClient.get(this._baseService.getBaseUrl() + 'Account/CheckBranch?HotelId=' + this._baseService.getHotelData().id);
    // }

}
