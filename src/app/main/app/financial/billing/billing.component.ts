import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../../bookings/booking.service';
import { BaseService } from 'app/utilities/base.service';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

    billingForm: FormGroup;
    paytype: any;
    payoption: any;
    selpaytype: any;
    datasource = new MatTableDataSource<any>();
    billId: any;
    state: any;
    editstate: Boolean = false;
    bill: any;
    displayedColumns: string[] = [
        'paymentFlag',
        'amount',
        'paymentType',
        'paymentOption',
        'Date',
        'Action'
    ];

    paymentFlag: string[] = [
        'Payment',
        'Refund'
    ];

    payments: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        public dialogRef: MatDialogRef<BillingComponent>,
        private _formBuilder: FormBuilder,
        private _bookService: BookingService,
        public modal: MatDialog,
        private _baseService: BaseService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.PayType();
        this.PayOption();
        this.Payments(this.data.bookId);
        this.billingForm = this._formBuilder.group({
            paymentTypeId: ['', Validators.required],
            amount: ['', Validators.required],
            paymentOptionId: ['', Validators.required],
            paymentType: ['', Validators.required]
        });

        this.billingForm.get('paymentTypeId').valueChanges.subscribe(value => {
            if (value) {
                this.selpaytype = value;
            }
        });
        this.dialogRef.disableClose = true;
    }

    change(): void {
        if (this.billingForm.get('paymentTypeId').value === '1') {
            this.billingForm.get('paymentOptionId').disable({ onlySelf: true });
        }
        else {
            this.billingForm.get('paymentOptionId').enable({ onlySelf: true });
        }
        // ;
    }

    PayType(): void {
        this._bookService.getPayType().subscribe(result => {
            // console.log(result);
            this.paytype = result;
        });
    }

    PayOption(): void {
        this._bookService.getPayOption().subscribe(result => {
           // console.log(result);
            this.payoption = result;
        });
    }


    Payments(id): void {
        
        this._bookService.getPayments(id).subscribe(result => {
            console.log(result.data);
            this.payments = result.data;
            this.state = result.message;
            this.datasource = new MatTableDataSource<any>(this.payments);
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        });

    
    }

    getBill(ele): void {
        this.bill = ele;
        this.editstate = true;
        this.billId = ele.id;
        this.billingForm.get('paymentTypeId').setValue(ele.paymentTypeId);
        this.billingForm.get('amount').setValue(ele.amount);
        this.billingForm.get('paymentOptionId').setValue(ele.paymentOptionId);
        this.billingForm.get('paymentType').setValue(ele.paymentType);
        

        this.change();
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

    closeModal(): void {
        this.dialogRef.close();
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
        const data = this.billingForm.value;
        data.bookId = this.data.bookId;
        // console.log(data);

        this._bookService.savePayments(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.billingForm.reset();
                    this.Payments(this.data.bookId);
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
        const data = this.billingForm.value;
        // console.log(data);
        data.id = this.bill.id;
        data.receivedBy = this.bill.receivedBy;
        data.updatedBy = this.bill.updatedBy;
        data.bookId = this.bill.bookId;
        this._bookService.updatePayments(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.editstate = false;
                    this.Payments(this.data.bookId);
                    this.billingForm.reset();
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
}
