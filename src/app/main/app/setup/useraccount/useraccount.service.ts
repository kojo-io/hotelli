import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseraccountService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    getRoles(): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}SetupItems/GetRoles`);
    }

    getEmployees(): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}Employees`);
    }

    postEmployees(info): any {
        return this.httpClient.post(`${this.baseService.getBaseUrl()}Employees/${info.role}`, info);
    }

    putEmployees(info): any {
        return this.httpClient.put(`${this.baseService.getBaseUrl()}Employees/${info.role}/${info.id}`, info);
    }
}
