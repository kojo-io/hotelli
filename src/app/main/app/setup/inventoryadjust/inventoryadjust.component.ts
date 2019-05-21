import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'app/utilities/base.service';
import { InventoryService } from '../inventory/inventory.service';

@Component({
    selector: 'app-inventoryadjust',
    templateUrl: './inventoryadjust.component.html',
    styleUrls: ['./inventoryadjust.component.scss']
})
export class InventoryadjustComponent implements OnInit {

    displayedColumns = ['NewQuantity', 'Reason', 'PreviousQuantity'];
    adjustmentForm: FormGroup;
    datasource = new MatTableDataSource<any>();
    editstate = false;
    id: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        public dialogRef: MatDialogRef<InventoryadjustComponent>,
        private _formBuilder: FormBuilder,
        private _inventoryService: InventoryService,
        public modal: MatDialog,
        private _baseService: BaseService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.adjustmentForm = this._formBuilder.group({
            newQuantity: ['', Validators.required],
            reason: ['', Validators.required]
        });
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
        const data = this.adjustmentForm.value;
        data.itemId = this.data.id;
        // console.log(data);

        this._inventoryService.postItemsAdjustments(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.adjustmentForm.reset();
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
        const data = this.adjustmentForm.value;
        // console.log(data);
        data.id = this.id;
        this._inventoryService.putItemsAdjustments(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.editstate = false;
                    this.adjustmentForm.reset();
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
