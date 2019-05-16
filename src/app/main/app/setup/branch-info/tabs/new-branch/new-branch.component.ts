import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BranchInfoService } from './../../branch-info.service';

@Component({
    selector: 'app-new-branch',
    templateUrl: './new-branch.component.html',
    styleUrls: ['./new-branch.component.scss']
})
export class NewBranchComponent implements OnInit {
    @Output() componentEvent = new EventEmitter<any>();

    branchForm: FormGroup;
    editstate: Boolean = false;
    branchId: any;
    constructor(
        private _formbuilder: FormBuilder,
        private _branchService: BranchInfoService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.branchForm = this._formbuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            contact: ['', Validators.required],
            email: ['', Validators.email],
            isActive: [true]
        });
    }

    save(): void{

        if (this.editstate === false){
            this.create();
        }
        else{
            this.edit();
            this.editstate = false;
        }
    }

    create(): void {
        const data = this.branchForm.value;
        // console.log(data);

        this._branchService.createBranch(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.branchForm.reset();
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
        const data = this.branchForm.value;
        // console.log(data);
        data.Id = this.branchId;
        this._branchService.editBranch(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.branchForm.reset();
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

    setForm(info): void{
        this.editstate = true;
        this.branchForm.reset();
        const branch = info;

        this.branchId = branch.id;

        this.branchForm = this._formbuilder.group({
            name: [branch.name, Validators.required],
            address: [branch.address, Validators.required],
            contact: [branch.contact, Validators.required],
            email: [branch.email, Validators.email],
            isActive: [branch.isActive]
        });
       // console.log(branch);
    }

}

