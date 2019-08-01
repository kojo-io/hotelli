import { BaseService } from 'app/utilities/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchInfoService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ) { }

    createBranch(branch: any): any{
        branch.userId = this.baseService.getUserData().id;
        branch.HotelInfoId = this.baseService.getHotelData().id;
        return this.httpClient.post(this.baseService.getBaseUrl() + 'Branch/CreateBranch', branch);
    }

    editBranch(branch: any): any {
        branch.userId = this.baseService.getUserData().id;
        branch.HotelInfoId = this.baseService.getHotelData().id;
        return this.httpClient.put(this.baseService.getBaseUrl() + 'Branch/EditBranch', branch);
    }

    listBranches(): any{
        if (this.baseService.getHotelData() !== undefined){
            return this.httpClient.get(this.baseService.getBaseUrl() + 'Branch/ListBranches?HotelId=' + this.baseService.getHotelData().id);
        }
        else{
            return false;
        }
    }

    getbranch(id): any{
        return this.httpClient.get(this.baseService.getBaseUrl() + 'Branch/GetBranch?branchId=' + id);
    }

    deleteBranch(id): any{
        return this.httpClient.delete(this.baseService.getBaseUrl() + 'Branch/DeleteBranch/' + id);
    }
}
