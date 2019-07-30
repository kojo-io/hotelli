import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';


//   const baseURL = 'https://localhost:44341/api/';
 const baseURL = 'https://api.hoteli.devwas.com/api/';
//  CRRuntime_32bit_13_0_22
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private router: Router,
      public snackBar: MatSnackBar,
      public httpClient: HttpClient
) { }

  private baseurl = baseURL;
  private now: any;
  

    getBaseUrl(): string {
        return this.baseurl;
    }

    setCurrentBranch(data: any): void{
        // console.log(data);
        localStorage.setItem('hoteliCB', JSON.stringify(data));
        this.snackBar.open(`Welcome ${data.name} branch`, 'dismiss', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    clearBranchInfo(): any{
        localStorage.removeItem('hoteliCB');
    }
    getCurrentBranch(): any{
        return JSON.parse(localStorage.getItem('hoteliCB'));
    }
    setSessionData(data: any): void {
        localStorage.setItem('Hsession', JSON.stringify(data));
    }
    
    getCurrency(): any{
        return this.httpClient.get(this.getBaseUrl() + 'SetupItems/Currency');
    }

    getRoomStates(): any {
        return this.httpClient.get(this.getBaseUrl() + 'SetupItems/RoomStatus');
    }

   getSesstionData(): any {
        //   return JSON.parse(localStorage.getItem('sessionData'));
        if (localStorage.getItem('Hsession')) {
            return JSON.parse(localStorage.getItem('Hsession'));
        }
        return false;
    }

    clearSessionData(): void {
        localStorage.removeItem('Hsession');
       // localStorage.clear();
        this.router.navigate(['/login']);
    }

    getToken(): any {
        // return this.getSesstionData().data.accessToken;
        if (this.getSesstionData()) {
            return this.getSesstionData().accesstoken;
        }
        return false;
    }

    getUserData(): any {
        //   return this.getSesstionData().data.profile;
        if (this.getSesstionData()) {
            //   return this.getSesstionData().data.profile;
            return this.getSesstionData().user;
        }

        return false;

    }

    getHotelData(): any {
        //   return this.getSesstionData().data.profile;
        if (this.getSesstionData()) {
            //   return this.getSesstionData().data.profile;
            return this.getSesstionData().hotel;
        }

        return false;

    }

    getEmployeeData(): any {
        //   return this.getSesstionData().data.profile;
        if (this.getSesstionData()) {
            //   return this.getSesstionData().data.profile;
            return this.getSesstionData().employ;
        }

        return false;

    }

    isSessionExpired(): boolean {
        if (this.getToken()) {
            this.now = new Date();
            const tesp = this.getToken().expire;
            const difference = Date.parse(tesp) - Date.parse(this.now);
            // console.log(difference);
            if (difference > 1) {
                return true;
            }
            else {
                this.clearSessionData();
                return false;
            }
        }

        this.clearSessionData();
        return false;
    }
}
