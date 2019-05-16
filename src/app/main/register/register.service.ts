import { Injectable } from '@angular/core';
import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    register(register: any): any {
        return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/Register', register);
    }

    getCountry(): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/Country');
    }

    Hotel(info): any{
        return this.httpClient.post(this.baseService.getBaseUrl() + 'SetupItems/Hotel', info );
    }
}
