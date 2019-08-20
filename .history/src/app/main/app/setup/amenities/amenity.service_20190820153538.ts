import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createAmenity(Amenity: any): any {
        Amenity.userId = this.baseService.getUserData().id;
        Amenity.HotelId = this.baseService.getHotelData().id;
        Amenity.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.post(this.baseService.getBaseUrl() + 'SetupItems/NewAmenity', Amenity);
    }

    editAmenity(Amenity: any): any {
        Amenity.userId = this.baseService.getUserData().id;
        Amenity.HotelId = this.baseService.getHotelData().id;
        Amenity.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.put(this.baseService.getBaseUrl() + 'SetupItems/EditAmenity', Amenity);
    }

    listAmenities(): any {
       // console.log(this.baseService.getCurrentBranch().id);
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/Amenities?BranchId=' + this.baseService.getCurrentBranch().id);
    }

    getAmenity(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/Amenity?amenityId=' + id);
    }
    deleteAmenity(id): any{
        return this.httpClient.delete(this.baseService.getBaseUrl() + '');
    }
}
