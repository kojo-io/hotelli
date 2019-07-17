import { BookingService } from '../../../booking.service';
import { RoomService } from 'app/main/app/setup/rooms/room.service';
import { BaseService } from 'app/utilities/base.service';
import { ReservationsComponent } from '../../../reservations/reservations.component';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckinsComponent } from '../../../checkins/checkins.component';

@Component({
    selector: 'app-listguest',
    templateUrl: './listguest.component.html',
    styleUrls: ['./listguest.component.scss']
})
export class ListguestComponent implements OnInit {
    guestColumns: string[] = [
        'First Name',
        'Last Name',
        'Email',
        'Contact',
        'AllowMail',
        'AllowSMS',
        'AllowNews',
        'Action'
    ];
    guests: any;
    guestsource = new MatTableDataSource<any>();
    @Output() componentEvent = new EventEmitter<any>();
    constructor(
        private _formBuilder: FormBuilder,
        private _bookService: BookingService,
        private _roomService: RoomService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar
    ) {
        this.getAllGuests();
    }
    selectedIndex: Number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngOnInit(): void {
    }

    openCheckins(id): void {
        this._bookService.getGuestCheckins(id).subscribe(result => {
            console.log(result);
            if (!result.status) {
                this.modal.open(CheckinsComponent, {
                    width: '100vw',
                    data: result
                });
            } else {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        });
       
    }

    openReserved(id): void {
        this._bookService.getGuestReservations(id).subscribe(result => {
            console.log(result);
            if (!result.status) {
                this.modal.open(ReservationsComponent, {
                    width: '100vw',
                    data: result
                });
            } else {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        });

    }

    applyGuestFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.guestsource = new MatTableDataSource<any>();
            this.guestsource.paginator = this.paginator;
            this.guestsource.sort = this.sort;
        } else {
            this.guestsource.filter = filterValue.trim().toLowerCase();
        }
    }

    getGuests(Id: string): void {
        this._bookService.getGuest(Id).subscribe(
            result => {
                this.componentEvent.emit({ selectedIndex: 1, formdata: result });
            }
        );
    }

    getAllGuests(): void {
        this._bookService.getGuests().subscribe(result => {
            // console.log(result);
            if (result) {
                this.guests = result;
                this.guestsource = new MatTableDataSource<any>(this.guests);
                this.guestsource.paginator = this.paginator;
            } else {
                this.guestsource = new MatTableDataSource<any>(this.guests);
                this.guestsource.paginator = this.paginator;
            }
        });
    }
}
