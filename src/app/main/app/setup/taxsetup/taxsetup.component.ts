import { TaxService } from './tax.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-taxsetup',
    templateUrl: './taxsetup.component.html',
    styleUrls: ['./taxsetup.component.scss']
})
export class TaxsetupComponent implements OnInit {
    displayedColumns: string[] = [
        'Name',
        'Percentage',
        'Active',
        'Action'
    ];
    Tax: any;
    TaxForm: FormGroup;
    editstate: Boolean = false;
    TaxId: any;
    datasource = new MatTableDataSource<any>();
    constructor(
        private _formbuilder: FormBuilder,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private _taxService: TaxService
    ) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit(): void {
        this.TaxForm = this._formbuilder.group({
          name: ['', Validators.required],
          percentage: [0, Validators.required],
          isActive: [true] 
        });

        this.getTaxes();
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

    getTaxes(): void{
        this._taxService.getTaxes().subscribe(results => {
            this.Tax = results;
            this.datasource = new MatTableDataSource<any>(this.Tax);
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        });
    }

    getTax(id): void {
        this._taxService.getTax(id).subscribe(results => {
           this.TaxId = results.id;
           this.editstate = true;
            this.TaxForm = this._formbuilder.group({
                name: [results.name, Validators.required],
                percentage: [results.percentage, Validators.required],
                isActive: [results.isActive]
            });
        });
    }

    clearform(): void{
        this.TaxForm = this._formbuilder.group({
            name: ['', Validators.required],
            percentage: [0, Validators.required],
            isActive: [true]
        });
        this.editstate = false;
    }

    save(): void {
        if (this.editstate === false) {
            this.create();
        }
        else {
            this.edit();
            this.editstate = false;
        }

        this.getTaxes();
    }

    create(): void {
        const data = this.TaxForm.value;
        // console.log(data);

        this._taxService.addTax(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
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
        const data = this.TaxForm.value;
        // console.log(data);
        data.Id = this.TaxId;
        this._taxService.editTax(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

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
}
