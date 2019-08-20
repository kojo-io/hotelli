import { FacilityService } from './facility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-facility',
    templateUrl: './facility.component.html',
    styleUrls: ['./facility.component.scss'],
    animations: fuseAnimations

})
export class FacilityComponent implements OnInit {

    displayColumn: String[] = [
        'type',
        'name',
        'description',
        'isactive',
        'Action'
    ];
    facilityForm: FormGroup;
    fId: any;
    facilities: any;
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
        this.getFacility();
        this.facilityForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            isActive: [true],
            facilityTypeid: ['', Validators.required]
        });

       
    }

    getFacilityTypes(): void {
        this._facilityService.getFaciltyTypes().subscribe(result => {
           // console.log(result);
            this.facilityTypes = result;
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

    getFacility(): void {
        this._facilityService.getFacilties().subscribe(result => {
            console.log(result);
            if (result.status === 'Error'){
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
            else{
                this.facilities = result;
                this.datasource = new MatTableDataSource<any>(this.facilities);
                this.datasource.paginator = this.paginator;
                this.datasource.sort = this.sort;
            }

            
        });
    }

    getFacilityType(ele): void {
        this.editstate = true;
        this.fId = ele.id;
        this.facilityForm.patchValue({
            name: ele.name,
            description: ele.description,
            isActive: ele.isActive,
            facilityTypeid: ele.facilityTypeId
        });
        
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
        const data = this.facilityForm.value;
        // console.log(data);

        this._facilityService.createFacilty(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.facilityForm.reset();
                    this.getFacility();
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
        const data = this.facilityForm.value;
        data.id = this.fId;
        // console.log(data);

        this._facilityService.editFacilty(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.facilityForm.reset();
                    this.getFacility();
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
