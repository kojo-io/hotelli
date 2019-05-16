import { Router } from '@angular/router';
import { BaseService } from './../../../../utilities/base.service';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import {
    MatPaginator,
    MatSort,
    MatTableDataSource,
    MatDialog,
    MatSnackBar,
    MatDialogRef
} from '@angular/material';
import { RoomService } from '../../setup/rooms/room.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookComponent implements OnInit, OnDestroy {
    userId: any;
    roomForm: FormGroup;
    SelectUserForm: FormGroup;
    paymentInfo: FormGroup;
    CompleteForm: FormGroup;
    results: Boolean = false;
    nResults: Boolean = false;
    country: any;
    searchForm: any;
    CheckIn: any;
    CheckOut: any;
    checkdisable: Boolean = false;
    displayedColumns: string[] = [
        'subtable',
        'Number',
        'Type',
        'Price',
        'Status',
        'Adults',
        'Children',
        'Description',
        'Active',
        'Action'
    ];

    guestColumns: string[] = [
        'First Name',
        'Last Name',
        'Email',
        'Contact',
        'Action'
    ];
    bookingId: any;
    subcolumns: string[] = ['Amenity'];
    allSelected = new Array<any>();
    selection = new SelectionModel<any>(true, []);
    rooms: any;
    guests: any;
    datasource = new MatTableDataSource<any>();
    guestsource = new MatTableDataSource<any>();
    roomAmenities: any;
    paytype: any;
    payoption: any;
    selpaytype: any;
    identity: any;
    selected: any;
    hotelInfo: any;
    tdate = new Date();
    message: any;
    editstate: Boolean = false;
    constructor(
        private _formBuilder: FormBuilder,
        private _bookService: BookingService,
        private _roomService: RoomService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar
    ) {}

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    /**
     * On destroy
     */
    ngOnInit(): void {
        this.Country();
        this.PayType();
        this.PayOption();
        this.getAllGuests();
        this.PayIdentityType();
        this.getHotelInfo();

        this._bookService.currentMessage.subscribe(
            message => (this.message = message)
        );

      
        this.roomForm = this._formBuilder.group({
            roomId: [new Array<any>(), Validators.required]
        });

        this.paymentInfo = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            contact: ['', Validators.required],
            countryId: ['', Validators.required],
            identificationTypeId: ['', Validators.required],
            iDnumber: ['', Validators.required],
            paymentId: ['', Validators.required],
            amount: ['', Validators.required],
            paymentOption: ['', Validators.required]
        });
        this.SelectUserForm = this._formBuilder.group({});
        this.paymentInfo.get('paymentId').valueChanges.subscribe(value => {
            if (value) {
                this.selpaytype = value;
            }
        });

        if (this.message.edit === true) {
            this.editstate = true;
            this.getBooking(this.message.data);
        }
    }

    ngOnDestroy(): void {
        this._bookService.changeMessage({ data: null, edit: false });
    }

    change(): void{
        if (this.paymentInfo.get('paymentId').value === '1'){
            this.paymentInfo.get('paymentOption').disable({onlySelf: true});
        }
        else{
            this.paymentInfo.get('paymentOption').enable({ onlySelf: true });
        }
        // ;
    }
   
    getHotelInfo(): void {
        this.hotelInfo = this._baseService.getHotelData();
        if (this.hotelInfo.logo === null) {
            this.hotelInfo.logo = 'assets/images/hotel.svg';
        }
    }

    // openModal(): void {
    //     this.modal.open(InvoiceComponent, {
    //          width: '100vw !important',
    //          height: '100%'
    //        // data: id
    //     });
    // }
    masterToggle(): void {
        this.isAllSelected()
            ? this.selection.clear()
            : this.datasource.data.forEach(row => this.selection.select(row));
        this.roomForm.get('roomId').setValue(this.selection.selected);
        console.log(this.selection.selected);
    }

    isAllSelected(): any {
        const numSelected = this.selection.selected.length;
        const numRows = this.datasource.data.length;
        return numSelected === numRows;
    }

    itemSelected(element): any {
        this.selection.toggle(element);
        this.selection.isSelected(element);
        this.selected = this.selection.selected;
        this.roomForm.get('roomId').setValue(this.selection.selected);
        console.log(this.roomForm.get('roomId').value);
        // console.clear();
        // console.log(this.selected);
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

    applyGuestFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.guestsource = new MatTableDataSource<any>();
            this.guestsource.paginator = this.paginator;
            this.guestsource.sort = this.sort;
        } else {
            this.guestsource.filter = filterValue.trim().toLowerCase();
        }
    }

    changedate(results): void{
        this.CheckIn = results.checkin;
        this.CheckOut = results.checkout;
        console.log('date, ', results);
    }

    getBooking(results): void {
        this.checkdisable = true;
        this.nResults = false;
        this.CheckIn = results.bookings.checkInDateTime;
        this.CheckOut = results.bookings.checkOutDateTime;
        this.bookingId = results.bookings.bookId;
        this.rooms = results.rooms;
        this.userId = results.guest.id;
        this.datasource = new MatTableDataSource<any>(this.rooms);
        this.datasource.paginator = this.paginator;
        this.paymentInfo = this._formBuilder.group({
            firstName: [results.guest.firstName, Validators.required],
            lastName: [results.guest.lastName, Validators.required],
            email: [results.guest.email, Validators.email],
            contact: [results.guest.contact, Validators.required],
            countryId: [results.guest.countryId, Validators.required],
            identificationTypeId: [
                results.guest.identificationTypeId,
                Validators.required
            ],
            iDnumber: [results.guest.iDnumber, Validators.required],
            paymentId: [results.bookings.paymentTypeId, Validators.required],
            paymentOption: [results.bookings.paymentOptionId, Validators.required],
            amount: [results.amount, Validators.required]
        });
       
        this.rooms.forEach(element => {
            this.selection.toggle(element);
            this.selection.isSelected(element);
            this.selected = this.selection.selected;
        });
        this.roomForm = this._formBuilder.group({
            roomId: [this.selection.selected, Validators.required]
        });
       // console.log('room =>', this.roomForm.get('roomId').value);
       }

    getAllRooms(results): void {
       // console.log('results =>', results.result);
        this.CheckIn = results.checkIn;
        this.CheckOut = results.checkOut;
        if (results.result.rooms) {
            this.nResults = true;
            this.rooms = results.result.rooms;
            console.log('rooms =>', this.rooms);
            this.datasource = new MatTableDataSource<any>(this.rooms);
            this.datasource.paginator = this.paginator;
        }
    }

    resetAll(): void {
        // this._router.navigateByUrl('/app/bookings/book', { skipLocationChange: true }).then(() => this._router.navigate(['/app/bookings/book']));

        this.roomForm.reset();
        this.paymentInfo.reset();
        this.selection.clear();
        this.rooms = null;
        this.datasource = new MatTableDataSource<any>();
        this.datasource.paginator = this.paginator;
    }

    clickIn(): void {
        const bookdata = new Array<any>();
        this.selection.selected.forEach(element => {
            const data = {
                room: element,
                guest: this.paymentInfo.value,
                CheckIn: new Date(this.CheckIn).toLocaleDateString(),
                CheckOut: new Date(this.CheckOut).toLocaleDateString(),
                PaymentTypeId: this.paymentInfo.get('paymentId').value,
                PaymentOptionId: this.paymentInfo.get('paymentOption').value,
                branchId: this._baseService.getCurrentBranch().id,
                Amount: this.paymentInfo.get('amount').value
            };
            data.guest.id = this.userId;
            bookdata.push(data);

        });

      //  data.guest.id = this.userId;
      console.log('data =>', bookdata);
        // return;

        if (this.editstate === true){
            this._bookService.editBooking(this.bookingId, bookdata).subscribe(
                results => {
                    if (results.message) {
                        this.snackBar.open(results.message, 'dismiss', {
                            duration: 4000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        });
                    }
                    if (results.status === 'Success') {
                        this.datasource = new MatTableDataSource<any>();
                        this.datasource.paginator = this.paginator;
                        this.resetAll();
                    }
                    this.datasource = new MatTableDataSource<any>();
                    this.datasource.paginator = this.paginator;
                    this.editstate = false;
                    this.resetAll();
                },
                error => {
                    this.snackBar.open(error, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }
            );
           
        } else{
            this._bookService.addBooking(bookdata).subscribe(
                results => {
                    if (results.message) {
                        this.snackBar.open(results.message, 'dismiss', {
                            duration: 4000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        });
                    }
                    if (results.status === 'Success') {
                        this.resetAll();
                        this.datasource = new MatTableDataSource<any>();
                        this.datasource.paginator = this.paginator;
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

    toggleRow(value): void {
        const index = this.datasource.data.indexOf(value);
        this.datasource.data[index].show = !this.datasource.data[index].show;
    }

    getRoomAmenities(id): void {
        this._roomService.listRoomAmenities(id).subscribe(result => {
            if (result.roomAmenities != null) {
                this.roomAmenities = result.roomAmenities;
            }
        });
    }

    Country(): void {
        this._bookService.getCountry().subscribe(result => {
            // console.log(result);
            this.country = result;
        });
    }

    PayType(): void {
        this._bookService.getPayType().subscribe(result => {
            // console.log(result);
            this.paytype = result;
        });
    }

    PayIdentityType(): void {
        this._bookService.getIdentityTypes().subscribe(result => {
            // console.log(result);
            this.identity = result;
        });
    }

    PayOption(): void {
        this._bookService.getPayOption().subscribe(result => {
            // console.log(result);
            this.payoption = result;
        });
    }

    selectRoom(id): void {
        // this.roomForm.patchValue({'roomId': id});
        let user;
        this.guests.forEach(element => {
            if (element.id === id) {
                user = element;
                return;
            }
        });

        this.paymentInfo = this._formBuilder.group({
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
            paymentId: [user.paymentId, Validators.required],
            paymentOption: [user.paymentOption, Validators.required],
            amount: ['', Validators.required]
        });
        this.userId = id;
        this.paymentInfo.get('paymentId').valueChanges.subscribe(value => {
            if (value) {
                this.selpaytype = value;
            }
        });
    }
}
