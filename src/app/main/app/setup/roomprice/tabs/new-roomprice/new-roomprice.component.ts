import { RoomtypeService } from './../../../roomtype/roomtype.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RoompriceService } from './../../roomprice.service';
import { BaseService } from 'app/utilities/base.service';

@Component({
  selector: 'app-new-roomprice',
  templateUrl: './new-roomprice.component.html',
  styleUrls: ['./new-roomprice.component.scss']
})
export class NewRoompriceComponent implements OnInit {

    roomPriceForm: FormGroup;
    editstate: Boolean = false;
    roomPriceId: any;
    roomTypes: any;
    currency: any;
    @Output() componentEvent = new EventEmitter<any>();

    constructor(
        private _formbuilder: FormBuilder,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public _roomPrice: RoompriceService,
        private _roomTypeService: RoomtypeService,
        private _baseService: BaseService
    ) { }

    ngOnInit(): void {
        this.roomPriceForm = this._formbuilder.group({
            roomTypeId: ['', Validators.required],
            price: ['', Validators.required],
            currencyId: ['', Validators.required],
            discount: [0]
        });
        
        this.getAllRoomTypes();
        this.getCurrency();
    }

    getAllRoomTypes(): void {
        this._roomTypeService.listRoomTypes().subscribe(
            result => {
                if (result != null) {
                    this.roomTypes = result;
                }
            }
        );
    }

    getCurrency(): void{
        this._baseService.getCurrency().subscribe(
            result => {
                if (result != null) {
                    this.currency = result;
                }
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

    create(): void {
        const data = this.roomPriceForm.value;
        // console.log(data);

        this._roomPrice.createRoomPrice(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.roomPriceForm.reset();
                    this.roomPriceForm.patchValue({ discount: 0 });
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
        const data = this.roomPriceForm.value;
        // console.log(data);
        data.Id = this.roomPriceId;
        this._roomPrice.editRoomPrice(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.roomPriceForm.reset();
                    this.roomPriceForm.patchValue({discount: 0 });
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

    setForm(info): void {
        this.editstate = true;
        this.roomPriceForm.reset();
        const roomprice = info;

        this.roomPriceId = roomprice.id;

        this.roomPriceForm = this._formbuilder.group({
            roomTypeId: [roomprice.roomTypeId, Validators.required],
            price: [roomprice.price, Validators.required],
            currencyId: [roomprice.currencyId, Validators.required],
            discount: [roomprice.discount]
        });
        // console.log(branch);
    }

}
