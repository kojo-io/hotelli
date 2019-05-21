import { FacilityService } from './../../facility/facility.service';
import { SupplierService } from './../../supplier/supplier.service';
import { InventoryService } from './../inventory.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-newinventory',
    templateUrl: './newinventory.component.html',
    styleUrls: ['./newinventory.component.scss']
})
export class NewinventoryComponent implements OnInit {

    inventoryForm: FormGroup;
    editstate: Boolean = false;
    collection: any;
    suppliers: any;
    facility: any;
    id: any;
    btnText: any;
    date: any;
    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private _matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewinventoryComponent>,
        private _inventoryService: InventoryService,
        private _supplierService: SupplierService,
        private _facilityService: FacilityService
    ) { }

    ngOnInit(): void {
        this.getCollect();
        this.getSplly();
        this.getFacili();
        this.dialogRef.disableClose = true;
        this.inventoryForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            quantity: ['', Validators.required],
            itemPrice: ['', Validators.required],
            unitPrice: ['', Validators.required],
            collectionId: ['', Validators.required],
            supplierId: ['', Validators.required],
            facilityId: ['', Validators.required],
            isActive: [true]
        });

        this.btnText = 'SAVE';

        if (this.data) {
            this.btnText = 'EDIT';
            this.editstate = true;
            this.id = this.data.u.id;
            this.date = this.data.u.created;
            this.inventoryForm.patchValue({
                name: this.data.u.name,
                description: this.data.u.description,
                quantity: this.data.u.quantity,
                itemPrice: this.data.u.itemPrice,
                unitPrice: this.data.u.unitPrice,
                collectionId: this.data.u.collectionId,
                supplierId: this.data.u.supplierId,
                facilityId: this.data.u.facilityId,
                isActive: this.data.u.isActive
            });
        }
    }

    getCollect(): void {
        this._inventoryService.getCollection().subscribe(
            result => {
                this.collection = result;
            }
        );
    }

    getSplly(): void {
        this._supplierService.getSuppliers().subscribe(
            result => {
                this.suppliers = result;
            }
        );
    }

    getFacili(): void {
        this._facilityService.getFacilties().subscribe(
            result => {
                this.facility = result;
            }
        );
    }

    save(): void {
        if (this.editstate === false) {
            this.add();
        } else {
            this.edit();
        }
    }

    add(): void {
        const data = this.inventoryForm.value;

        this._inventoryService.postInventory(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.inventoryForm.reset();
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
    //                 this.inventoryForm.reset();
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
        this.data = this.inventoryForm.value;
        this.data.id = this.id;
        this.data.created = this.date;
        this._inventoryService.putInventory(this.data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.inventoryForm.reset();
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
