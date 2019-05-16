import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModule } from './login.module';
import { BaseService } from 'app/utilities/base.service';

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

