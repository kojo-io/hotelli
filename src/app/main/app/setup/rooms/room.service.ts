import { Injectable } from '@angular/core';
import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createRoom(Room: any): any {
        return this.httpClient.post(this.baseService.getBaseUrl() + 'Rooms/AddRoom', Room);
    }

    editRoom(Room: any): any {
        return this.httpClient.put(this.baseService.getBaseUrl() + 'Rooms/EditRoom/' + Room.id, Room);
    }

    listRooms(): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'Rooms/GetRooms');
    }

    getRoom(id): any {
        return this.httpClient.get(this.baseService.getBaseUrl() + 'Rooms/GetRoom/' + id);
    }

    listAmenities(): any {
    //    console.log(this.baseService.getCurrentBranch().id);
        return this.httpClient.get(this.baseService.getBaseUrl() + 'SetupItems/Amenities');
    }

    listRoomAmenities(id): any {
        //    console.log(this.baseService.getCurrentBranch().id);
        return this.httpClient.get(this.baseService.getBaseUrl() + 'RoomAmenities/GetAllRoomAmenitiesAsync/' + id);
    }
    // 
    createRoomAmenities(Amenities: any, id: any): any {
        return this.httpClient.post(this.baseService.getBaseUrl() + 'RoomAmenities/AddRoomAmenities/' + id, Amenities);
    }

}
