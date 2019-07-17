import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    getCollection(): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}SetupItems/Collections`);
    }

    getInventory(): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}Inventories`);
    }

    postInventory(info): any {
        return this.httpClient.post(`${this.baseService.getBaseUrl()}Inventories`, info);
    }

    putInventory(info): any {
        return this.httpClient.put(`${this.baseService.getBaseUrl()}Inventories/${info.id}`, info);
    }

    getItemsAdjustments(ItemId): any {
        return this.httpClient.get(`${this.baseService.getBaseUrl()}InventoryItemAdjustments/GetInventoryItemAdjustments/${ItemId}`);
    }

    postItemsAdjustments(info): any {
        return this.httpClient.post(`${this.baseService.getBaseUrl()}InventoryItemAdjustments`, info);
    }

    putItemsAdjustments(info): any {
        return this.httpClient.put(`${this.baseService.getBaseUrl()}InventoryItemAdjustments/${info.id}`, info);
    }
}
