import { NewguestComponent } from './tabs/newguest/newguest.component';
import { ListguestComponent } from './tabs/listguest/listguest.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { receptionNav } from 'app/navigation/receptionnav';
import { BaseService } from 'app/utilities/base.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { navigation } from 'app/navigation/navigation';
import { MatTabChangeEvent } from '@angular/material';

@Component({
    selector: 'app-list-bookings',
    templateUrl: './list-bookings.component.html',
    styleUrls: ['./list-bookings.component.scss']
})
export class ListBookingsComponent implements OnInit {
    selectedIndex: Number = 0;
    @ViewChild(NewguestComponent) newguest;
    @ViewChild(ListguestComponent) Allguest;
    navigation: any;
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _baseService: BaseService
    ) {
        //  Get default navigation
        if (this._baseService.getUserData().role === 'Administrator') {
            this.navigation = navigation;
        }

        if (this._baseService.getUserData().role === 'Receptionist') {
            this.navigation = receptionNav;
        }
        // Set default navigation

        // Unregister navigation
        this._fuseNavigationService.unregister('setups');

        // Register the navigation to the service
        this._fuseNavigationService.register('setups', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('setups');
    }

    ngOnInit(): void {
      
    }
    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newguest.setForm($event.formdata);
        }
        if ($event.reload) {
            this.Allguest.getAllGuests();
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.Allguest.getAllGuests();
    }

}
