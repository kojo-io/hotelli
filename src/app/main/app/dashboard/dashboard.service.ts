import { BaseService } from 'app/utilities/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService
    ) { }

    getAvailable(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Dashboard/AvailableRooms'
        );
    }

    getBooked(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Dashboard/BookedRooms'
        );
    }

    getReserved(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Dashboard/ReservedRooms'
        );
    }

    getHouseKeeping(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Dashboard/HouseKeepingRooms'
        );
    }
}
