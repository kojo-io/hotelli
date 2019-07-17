import { BookingService } from '../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    checkoutForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogComponent>,
        private _bookService: BookingService,
        private _formbuilder: FormBuilder,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.checkoutForm = this._formbuilder.group({
              bookId: [''],
              amount: [0.0]
        });

        this.checkoutForm.patchValue({
            bookId: this.data.data
        });

        console.log(this.checkoutForm.value);
    }

    buttonMethod(): void {
        if (this.data.method === 'checkOut') {
            this.checkOut();
        }
        if (this.data.method === 'PaidCancellation'){
            this.PaidCancellation();
        }
        if (this.data.method === 'FreeCancellation'){
            this.FreeCancellation();
        }

        this.dialogRef.close();
    }


    checkOut(): void {
        const data = this.checkoutForm.value;
        this._bookService.checkOutUser(data).subscribe(
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

    PaidCancellation(): void {
        const data = this.checkoutForm.value;
        this._bookService.PaidCancellation(data).subscribe(
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

    FreeCancellation(): void {
        const data = this.checkoutForm.value;
        this._bookService.FreeCancellation(data).subscribe(
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

    /// add a loader in the future
}
