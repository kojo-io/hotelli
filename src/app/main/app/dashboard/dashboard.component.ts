import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { receptionNav } from 'app/navigation/receptionnav';
import { navigation } from 'app/navigation/navigation';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { BaseService } from 'app/utilities/base.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent implements OnInit {

    projects: any[];
    selectedProject: any;
    available: any;
    booked: any;
    reserved: any;
    housekeeping: any;
    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    navigation: any;
    dateNow = Date.now();
    constructor(
        public baseService: BaseService,
        public snackBar: MatSnackBar,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _dashboardservice: DashboardService
    ) 
    {

        //  Get default navigation
        if (this.baseService.getUserData().role === 'Administrator') {
            this.navigation = navigation;
        }

        if (this.baseService.getUserData().role === 'Receptionist') {
            this.navigation = receptionNav;
        }
        // Set default navigation

        // Unregister navigation
        this._fuseNavigationService.unregister('setups');

        // Register the navigation to the service
        this._fuseNavigationService.register('setups', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('setups');

        // //  show on-demand menu button
        // this._fuseSidebarService.showHideButton(true);
        /**
         * Widget 5
         */

        /**
         * Widget 6
         */
      
        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
     
        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

     }

    getAvailable(): void {
        this._dashboardservice.getAvailable().subscribe(result => {
            this.available = result;
        });
    }

    getBooked(): void {
        this._dashboardservice.getBooked().subscribe(result => {
            this.booked = result;
        });
    }

    getReserved(): void {
        this._dashboardservice.getReserved().subscribe(result => {
            this.reserved = result;
        });
    }

    getHouseKeeping(): void {
        this._dashboardservice.getHouseKeeping().subscribe(result => {
            this.housekeeping = result;
        });
    }

    ngOnInit(): void {
        // this.branch = this.baseService.getCurrentBranch().name;

        this.getAvailable();
        this.getBooked();
        this.getReserved();
        this.getHouseKeeping();
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
