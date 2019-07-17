import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { FacilityService } from '../facility/facility.service';

@Component({
    selector: 'app-facility-type',
    templateUrl: './facility-type.component.html',
    styleUrls: ['./facility-type.component.scss']
})
export class FacilityTypeComponent implements OnInit {
    displayColumn: String[] = [
        'name',
        'Action'
    ];
    facilityTypeForm: FormGroup;
    fId: any;
    facilityTypes: any;
    editstate: Boolean = false;
    datasource = new MatTableDataSource<any>();
    constructor(
        private _formBuilder: FormBuilder,
        private _facilityService: FacilityService,
        public snackBar: MatSnackBar,
    ) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngOnInit(): void {
        this.getFacilityTypes();
        this.facilityTypeForm = this._formBuilder.group({
            name : ['', Validators.required]
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

    getFacilityTypes(): void{
        this._facilityService.getFaciltyTypes().subscribe(result => {
            console.log(result);
            if (result.status === 'Error') {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
            else{
                this.facilityTypes = result;
                this.datasource = new MatTableDataSource<any>(this.facilityTypes);
                this.datasource.paginator = this.paginator;
                this.datasource.sort = this.sort;
            }
           
        });
    }

    getFacilityType(ele): void {
       this.editstate = true;
       this.fId = ele.id;
        this.facilityTypeForm.get('name').setValue(ele.name);
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
        const data = this.facilityTypeForm.value;
        // console.log(data);

        this._facilityService.createFaciltyType(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.facilityTypeForm.reset();
                    this.getFacilityTypes();
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
        const data = this.facilityTypeForm.value;
        data.id = this.fId;
        // console.log(data);

        this._facilityService.editFaciltyType(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.facilityTypeForm.reset();
                    this.getFacilityTypes();
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
