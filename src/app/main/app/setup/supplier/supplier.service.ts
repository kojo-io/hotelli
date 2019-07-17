import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    getSuppliers(): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}Suppliers`);
    }

    postSuppliers(info): any {
        return this.httpClient.post(`${this.baseService.getBaseUrl()}Suppliers`, info);
    }

    putSuppliers(info): any {
        return this.httpClient.put(`${this.baseService.getBaseUrl()}Suppliers/${info.id}`, info);
    }

}
