import { BookComponent } from './book/book.component';
import { BookingService } from './booking.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AmenityService } from '../setup/amenities/amenity.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss'],
    animations: fuseAnimations
})
export class BookingsComponent implements OnInit {

    bookingForm: FormGroup;
    amenities: any;
    bookings: any;
    message: any;
    constructor(
        private _formbuilder: FormBuilder,
        private _amenityService: AmenityService,
        private _bookService: BookingService,
        public snackBar: MatSnackBar
    ) { }
    @ViewChild(BookComponent) bookcomponent;
    ngOnInit(): void {
        this.bookingForm = this._formbuilder.group({
            CheckIn: [new Date()],
            CheckOut: [this.formatDate(new Date())],
            Nights: [],
            Adult: [0],
            Children: [0],
            amenities: [new Array<any>()]
        });

        this.getAllAmenities();

        this.bookingForm.get('CheckIn').valueChanges.subscribe(
            value => {
                if (value) {
                    const v = this.formatDate(value._d);
                   // console.log(' date => ', v, 'datev =>', value);
                    
                    if (this.bookingForm.get('CheckOut').value < v ) {
                        this.bookingForm.get('CheckOut').setValue(v);
                    }
                }

                this.getTotalDays();
            }
        );

        this.bookingForm.get('CheckOut').valueChanges.subscribe(
            value => {
                if (value) {
                    if (this.bookingForm.get('CheckIn').value > this.bookingForm.get('CheckOut').value){
                        const v = this.formatDate(this.bookingForm.get('CheckIn').value);
                        this.bookingForm.get('CheckOut').setValue(v);
                    }

                    this.getTotalDays();
                }
            }
        );

        this._bookService.currentMessage.subscribe(message => this.message = message);
        if (this.message.edit === true){
            console.log('result =>', this.message.data );
            this.bookingForm.get('CheckOut').setValue(new Date(this.message.data.bookings.checkOutDateTime));
            this.bookingForm.get('CheckIn').setValue(new Date(this.message.data.bookings.checkInDateTime));
            // this.bookcomponent.getBooking(this.message.data);
            // this._bookService.changeMessage({ data: null, edit: false });
        }

        this.getTotalDays();
    }

    changeDates(): void{
        const data = {
            checkin: this.bookingForm.get('CheckIn').value,
            checkout: this.bookingForm.get('CheckOut').value
        };
        console.log(data);
        this.bookcomponent.changedate(data);

        
    }

    formatDate(date): any{
        const today = new Date(date);
        const dd = new Date(today);        

        return new Date(today.setDate(dd.getDate() + 1));
    }

    getTotalDays(): void{
        const oneDay = 24 * 60 * 60 * 1000;
        const chkIn = new Date(this.bookingForm.get('CheckIn').value);
        const chOut = new Date(this.bookingForm.get('CheckOut').value);
        
        const val = Math.round(Math.abs((chkIn.getTime() - chOut.getTime()) / (oneDay)));

       this.bookingForm.get('Nights').setValue(val);
    }

    getAllAmenities(): void {
        this._amenityService.listAmenities().subscribe(
            result => {
                console.log(result);
                if (result != null) {
                    this.amenities = result;
                }
            }
        );
    }

// getAllRooms

    searchForm(): void{
        const prevValue = this.bookingForm.value;
        this.bookingForm.get('CheckIn').setValue(new Date(this.bookingForm.get('CheckIn').value).toLocaleDateString());
        this.bookingForm.get('CheckOut').setValue(new Date(this.bookingForm.get('CheckOut').value).toLocaleDateString());
        const CurValue = this.bookingForm.value;
        this.bookingForm.setValue(prevValue);
       // console.log('search =>', this.bookingForm.value);
        const checkin = this.bookingForm.get('CheckIn').value;
        const checkout = this.bookingForm.get('CheckOut').value;
        this._bookService.searchForRoom(CurValue).subscribe(
            results => {
                
                if (results.message){
                    this.snackBar.open(results.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

                if (results){
                    this.bookcomponent.resetAll();
                    this.bookcomponent.getAllRooms({ result: results, checkIn: checkin, checkOut: checkout });
                } else{
                    this.snackBar.open('No room found!', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }
               
            }
        );

    }

}
