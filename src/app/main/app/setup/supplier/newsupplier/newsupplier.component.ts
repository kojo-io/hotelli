import { SupplierService } from '../supplier.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-newsupplier',
  templateUrl: './newsupplier.component.html',
  styleUrls: ['./newsupplier.component.scss']
})
export class NewsupplierComponent implements OnInit {

    supplierForm: FormGroup;
    editstate: Boolean = false;
    id: any;
    btnText: any;
    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private _supplierService: SupplierService,
        private _matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewsupplierComponent>
    ) { }

    ngOnInit(): void {
        this.dialogRef.disableClose = true;
        this.supplierForm = this.formBuilder.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.required],
            url: [''],
            isActive: [true]
        });

        this.btnText = 'SAVE';

        if (this.data) {
            this.btnText = 'EDIT';
            this.editstate = true;
            this.id = this.data.id;
            this.supplierForm.patchValue({
                name: this.data.name,
                city: this.data.city,
                address: this.data.address,
                email: this.data.email,
                phone: this.data.phone,
                url: this.data.url,
                isActive: this.data.isActive
            });
        }
    }

    save(): void {
        if (this.editstate === false) {
            this.add();
        } else {
            this.edit();
        }
    }

    add(): void {
        const data = this.supplierForm.value;

        this._supplierService.postSuppliers(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.supplierForm.reset();
                } else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                }
            },
            error => {
                this.snackBar.open(error.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                });
            }
        );
    }

    // delete(): void {
    //     this.sponsorService.deleteSponsortype(this.data.id).subscribe(
    //         result => {
    //             if (result.status === 201) {
    //                 this.snackBar.open(result.message, 'dismiss', {
    //                     duration: 4000,
    //                     horizontalPosition: 'right',
    //                     verticalPosition: 'top'
    //                 });
    //                 this.supplierForm.reset();
    //             } else {
    //                 this.snackBar.open(result.message, 'dismiss', {
    //                     duration: 4000,
    //                     horizontalPosition: 'right',
    //                     verticalPosition: 'top'
    //                 });
    //             }
    //         },
    //         error => {
    //             this.snackBar.open(error.message, 'dismiss', {
    //                 duration: 4000,
    //                 horizontalPosition: 'right',
    //                 verticalPosition: 'top'
    //             });
    //         }
    //     );
    // }

    edit(): void {
        this.data = this.supplierForm.value;
        this.data.id = this.id;
        this._supplierService.putSuppliers(this.data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.supplierForm.reset();
                    this.editstate = false;
                    this.btnText = 'SAVE';
                } else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                }
            },
            error => {
                this.snackBar.open(error.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                });
            }
        );
    }
}
