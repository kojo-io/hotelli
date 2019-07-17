import { navigation } from 'app/navigation/navigation';
import { BookingService } from '../bookings/booking.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { receptionNav } from 'app/navigation/receptionnav';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/utilities/base.service';

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit, OnDestroy {
    route: any;
    receipt: any;
    hotel: any;
    guest: any;
    info: any;
    spend: any;
    data: any;
    tax: any;
    Rid: any;
    rooms = new Array<any>();
    date = new Date().toLocaleDateString();
    navigation: any;
    constructor(
        private _bookService: BookingService,
        private router: Router,
        private baseService: BaseService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
    ) {
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

        this._bookService.currentRoute.subscribe(
            newroute => (this.route = newroute)
        );

        this._bookService.currentReceipt.subscribe(
            newinvoice => (this.receipt = newinvoice)
        );
        if (this.receipt === '') {
            this.router.navigate(['/app/dashboard']);
        }
    }

    ngOnInit(): void {
        this.hotel = this.baseService.getHotelData();

        if (this.receipt !== '') {
            this._bookService.getReceipt(this.receipt).subscribe(results => {
                if (results.data) {
                    console.log(results.data);
                    this.data = results.data;
                    this.info = results.data.bill;
                    this.spend = results.data.spending;
                    this.tax = results.data.spending.taxes;
                    // this.rooms = results.rooms;
                    this.guest = results.data.guest;
                    // this.info = results.info;
                    this.Rid = results.data.id;
                    // this.info.total = results.totalDue;
                    this.info.paymentType = results.data.paymentinfo.paymentMethod;
                    this.info.paymentOption = results.data.paymentinfo.paymentOption;
                    this.info.debit = results.data.paymentinfo.balance;
                    this.info.credit = results.data.paymentinfo.change;
                    this.info.currency = results.data.paymentinfo.currency;
                }
            });
        } else {
            this.router.navigate(['/app/dashboard']);
        }
        // this.rooms = [
        //     {
        //         number: 1,
        //         price: 1000,
        //         tNights: 4,
        //         total: this.cal(1000, 4)
        //     }
        // ];
    }

    ngOnDestroy(): void { }

    cal(n, s): any {
        return n * s;
    }
}

