import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FacilityService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createFaciltyType(info): any{
        return this.httpClient.post(this.baseService.getBaseUrl() + 'FacilityTypes', info);
    }

    createFacilty(info): any {
        return this.httpClient.post(this.baseService.getBaseUrl() + 'Facilities', info);
    }

    editFaciltyType(info): any {
        return this.httpClient.put(this.baseService.getBaseUrl() + 'FacilityTypes/' + info.id, info);
    }
    editFacilty(info): any {
        return this.httpClient.put(this.baseService.getBaseUrl() + 'Facilities/' + info.id, info);
    }

    getFaciltyTypes(): any{
        return this.httpClient.get(this.baseService.getBaseUrl() + 'FacilityTypes');
    }

    getFacilties(): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'Facilities');
    }

    getFaciltyType(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'FacilityTypes/' + id);
    }

    getFacilty(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'Facilities/' + id);
    }
}
