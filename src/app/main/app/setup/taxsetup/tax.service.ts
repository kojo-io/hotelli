import { Injectable } from '@angular/core';
import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaxService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService
    ) { }

    getTaxes(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Tax'
        );
    }

    getTax(id): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Tax/' + id
        );
    }

    addTax(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Tax', info
        );
    }

    editTax(info): any {
        return this.httpClient.put(
            this.baseService.getBaseUrl() + 'Tax/' + info.Id, info
        );
    }
}
