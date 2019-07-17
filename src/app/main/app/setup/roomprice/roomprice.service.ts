import { BaseService } from 'app/utilities/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoompriceService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createRoomPrice(roomPrice: any): any {
        roomPrice.userId = this.baseService.getUserData().id;
        roomPrice.HotelId = this.baseService.getHotelData().id;
        roomPrice.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.post(this.baseService.getBaseUrl() + 'SetupItems/NewRoomPrice', roomPrice);
    }

    editRoomPrice(roomPrice: any): any {
        roomPrice.userId = this.baseService.getUserData().id;
        roomPrice.HotelId = this.baseService.getHotelData().id;
        roomPrice.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.put(this.baseService.getBaseUrl() + 'SetupItems/EditRoomPrice', roomPrice);
    }

    listRoomPrices(): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/RoomPrices?BranchId=' + this.baseService.getCurrentBranch().id);
    }

    getRoomPrice(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/RoomPrice?roomPriceId=' + id);
    }
}
