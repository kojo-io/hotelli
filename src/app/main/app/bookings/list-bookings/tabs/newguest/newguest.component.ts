import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookingService } from '../../../booking.service';
import { RoomService } from 'app/main/app/setup/rooms/room.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseService } from 'app/utilities/base.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-newguest',
    templateUrl: './newguest.component.html',
    styleUrls: ['./newguest.component.scss']
})
export class NewguestComponent implements OnInit {
    guestform: FormGroup;
    country: any;
    identity: any;
    userid: any;
    editstate: Boolean = false;
    preValue: any;
    @Output() componentEvent = new EventEmitter<any>();
    constructor(
        private _formBuilder: FormBuilder,
        private _bookService: BookingService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.Country();
        this.PayIdentityType();
        this.guestform = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            contact: ['', Validators.required],
            countryId: ['', Validators.required],
            identificationTypeId: ['', Validators.required],
            iDnumber: ['', Validators.required],
            allowEmails: [false],
            allowSMS: [false],
            allowPromotionsNewsletters: [false]
        });
        this.preValue = this.guestform.value;
    }

    Country(): void {
        this._bookService.getCountry().subscribe(result => {
            // console.log(result);
            this.country = result;
        });
    }

    clearform(): void{
        //  this.guestform.reset();
        this.editstate = false;
        this.userid = null;
        this.guestform.setValue(this.preValue);
    }

    PayIdentityType(): void {
        this._bookService.getIdentityTypes().subscribe(result => {
            // console.log(result);
            this.identity = result;
        });
    }

    setForm(info): void {
        this.editstate = true;
        this.guestform.reset();
        const user = info;

        this.userid = user.id;

        this.guestform = this._formBuilder.group({
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, Validators.email],
            contact: [user.contact, Validators.required],
            countryId: [user.countryId, Validators.required],
            identificationTypeId: [
                user.identificationTypeId,
                Validators.required
            ],
            iDnumber: [user.iDnumber, Validators.required],
            allowEmails: [user.allowEmails],
            allowSMS: [user.allowSMS],
            allowPromotionsNewsletters: [user.allowPromotionsNewsletters]
        });
        // console.log(branch);
    }


    create(): void {
        const data = this.guestform.value;
        // console.log(data);

        this._bookService.addGuest(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.clearform();
                }
                else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            },
            error => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        );
    }

    edit(): void {
        const data = this.guestform.value;
        // console.log(data);
        data.id = this.userid;
        this._bookService.editGuest(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.clearform();
                }
                else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            },
            error => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        );
    }

    save(): void {

        if (this.editstate === false) {
            this.create();
        }
        else {
            this.edit();
            this.editstate = false;
        }
    }
}
