import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../booking.service';
import { BaseService } from 'app/utilities/base.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-extenddays',
    templateUrl: './extenddays.component.html',
    styleUrls: ['./extenddays.component.scss'],
    animations: fuseAnimations
})
export class ExtenddaysComponent implements OnInit {

    extendform: FormGroup;
    booking: any;    
    constructor(
        public dialogRef: MatDialogRef<ExtenddaysComponent>,
        private _bookService: BookingService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _formbuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {

        this.booking = this.data;
        this.dialogRef.disableClose = true;
        this.extendform = this._formbuilder.group({
            CheckIn: [this.nformatDate(this.data.checkInDateTime)],
            CheckOut: [this.nformatDate(this.data.checkOutDateTime)],
            Nights: []
        });
        

        this.extendform.get('CheckIn').valueChanges.subscribe(
            value => {
                if (value) {
                    const v = this.formatDate(value._d);
                    // console.log(' date => ', v, 'datev =>', value);

                    if (this.extendform.get('CheckOut').value < v) {
                        this.extendform.get('CheckOut').setValue(v);
                    }

                    this.getTotalDays();
                }
            }
        );

        this.extendform.get('CheckOut').valueChanges.subscribe(
            value => {
                if (value) {
                    if (this.extendform.get('CheckIn').value > this.extendform.get('CheckOut').value) {
                        const v = this.formatDate(this.extendform.get('CheckIn').value);
                        this.extendform.get('CheckOut').setValue(v);
                    }

                    this.getTotalDays();
                }
            }
        );

    }
    formatDate(date): any {
        const today = new Date(date);
        const dd = new Date(today);

        return new Date(today.setDate(dd.getDate() + 1));
    }

    nformatDate(date): any {
        const today = new Date(date);
        const dd = new Date(today);

        return new Date(today.setDate(dd.getDate()));
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    getTotalDays(): void {
        const oneDay = 24 * 60 * 60 * 1000;
        const chkIn = new Date(this.extendform.get('CheckIn').value);
        const chOut = new Date(this.extendform.get('CheckOut').value);

        const val = Math.round(Math.abs((chOut.getTime() - chkIn.getTime()) / (oneDay)));

        this.extendform.get('Nights').setValue(val);
    }

    ngetTotalDays(ChkIn, chkOut): void {
        const oneDay = 24 * 60 * 60 * 1000;
        const chkIn = new Date(ChkIn);
        const chOut = new Date(chkOut);

        const val = Math.round(Math.abs((chOut.getTime() - chkIn.getTime()) / (oneDay)));

        this.extendform.get('Nights').setValue(val);
    }

    show(): void {
        const today = new Date(this.extendform.get('CheckIn').value);
        const date = new Date(today.setDate(today.getDate() + this.extendform.get('Nights').value));
        this.extendform.get('CheckOut').setValue(date);
    }

    save(): void{
        const data = this.booking;
        this.data.checkInDateTime = new Date(this.extendform.get('CheckIn').value).toLocaleDateString();
        this.data.checkOutDateTime = new Date(this.extendform.get('CheckOut').value).toLocaleDateString();

        this._bookService.extendsBooking(data).subscribe(
            results => {
                if (results.status === 'Success') {
                    this.snackBar.open(results.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open(results.message, 'dismiss', {
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

}
