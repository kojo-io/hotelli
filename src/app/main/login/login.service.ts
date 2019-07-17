import { LoginModule } from './login.module';
import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    login(userlogin: LoginModule): any {
        return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/Login', userlogin);
    }

    /* Logout: endpoint not ready */
    // logOut(): any {
    //     return this.httpClient.get(this.baseService.getBaseUrl() + 'authentication/logout');
    // }

}

