import { ExtenddaysComponent } from '../extenddays/extenddays.component';
import { BookingService } from '../booking.service';
import { BaseService } from 'app/utilities/base.service';
import { BillingComponent } from '../../financial/billing/billing.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { navigation } from 'app/navigation/navigation';
import { receptionNav } from 'app/navigation/receptionnav';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-checkins',
  templateUrl: './checkins.component.html',
  styleUrls: ['./checkins.component.scss']
})
export class CheckinsComponent implements OnInit {
    displayColumns: string[] = [
        'subtable',
        'Book Id',
        'Check IN',
        'Check OUT',
        'Nights',
        'Payment Type',
        'Payment Option',
        'Action'
    ];
    SubColumns: string[] = [
        'Number',
        'Type',
        'Price',
        'Adults',
        'Children',
        'Description',
        'Action'
    ];
    checkdisable: Boolean = false;
    datasource = new MatTableDataSource<any>();
    reservations: any;
    extendDaysAllowed: Boolean = true;
    checkOutAllowed: Boolean = true;
    navigation: any;
    constructor(
        public dialogRef: MatDialogRef<CheckinsComponent>,
        private _bookService: BookingService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngOnInit(): void {
        this.dialogRef.disableClose = true;
        this.getReservations(this.data);
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    applyFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.datasource = new MatTableDataSource<any>();
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        } else {
            this.datasource.filter = filterValue.trim().toLowerCase();
        }
    }

    toggleRow(value): void {
        const index = this.datasource.data.indexOf(value);
        this.datasource.data[index].show = !this.datasource.data[index].show;
    }

    getReservations(id): void {
        this.reservations = id;
        this.datasource = new MatTableDataSource<any>(this.reservations);
        this.datasource.paginator = this.paginator;
    }

    generateReceipt(id): void {
        this._bookService.getReceipt(id).subscribe(results => {
            console.log(results);
            if (results.status === 'Success') {
                this._bookService.checkReceipt(id);
                console.log(this.route);
                this._bookService.checkRoute(this.route);
            }

            if (results.status === 'Owing') {
                this.snackBar.open(results.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this._bookService.checkReceipt(id);
                console.log(this.route);
                this._bookService.checkRoute(this.route);

            }

            if (results.status === 'Refund') {
                this.snackBar.open(results.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this._bookService.checkReceipt(id);
                console.log(this.route);
                this._bookService.checkRoute(this.route);

            }

            if (results.status === 'Error') {
                this.snackBar.open(results.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }

            this._router.navigate(['/app/receipt']);
            this.dialogRef.close();
        });

    }


    check(checkIn, checkOut): any {

        const chkIn = new Date(checkIn);
        const chOut = new Date(checkOut);
        const today = new Date();

        if (today < chkIn) {
            this.extendDaysAllowed = true;
            this.checkOutAllowed = false;
        }

        if (today < chOut && chkIn < today) {
            this.checkOutAllowed = true;
            this.extendDaysAllowed = true;
        }

        if (today > chOut) {
            this.checkOutAllowed = false;
            this.extendDaysAllowed = false;
        }

        // if (today > chOut) {
        //     this.checkOutAllowed = false;
        // }

    }

    extendDays(data): any {
        this.modal.open(ExtenddaysComponent, {
            width: '50vw',
            data: data
        });
    }

    // CheckOut

    billingInfo(data): any {
        this.modal.open(BillingComponent, {
            width: '100vw',
            data: data
        });
    }

    checkOut(data): any {
        this.modal.open(DialogComponent, {
            data: { message: 'Are you sure you want to check out user ?', data: data, inputHidden: false, method: 'checkOut'}
        });
    }
}
