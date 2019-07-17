import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createRoomType(roomType: any): any {
        roomType.userId = this.baseService.getUserData().id;
        roomType.HotelId = this.baseService.getHotelData().id;
        roomType.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.post(this.baseService.getBaseUrl() + 'SetupItems/NewRoomType', roomType);
    }

    editRoomType(roomType: any): any {
        roomType.userId = this.baseService.getUserData().id;
        roomType.HotelId = this.baseService.getHotelData().id;
        roomType.BranchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.put(this.baseService.getBaseUrl() + 'SetupItems/EditRoomType', roomType);
    }

    listRoomTypes(): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/RoomTypes?BranchId=' + this.baseService.getCurrentBranch().id);
    }

    getRoomType(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/RoomType?roomTypeId=' + id);
    }
}
