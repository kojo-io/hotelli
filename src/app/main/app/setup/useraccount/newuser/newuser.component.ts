import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UseraccountService } from '../useraccount.service';

@Component({
    selector: 'app-newuser',
    templateUrl: './newuser.component.html',
    styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

    userForm: FormGroup;
    editstate: Boolean = false;
    roles = [];
    id: any;
    btnText: any;
    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private _useraccountService: UseraccountService,
        private _matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewuserComponent>
    ) { }

    ngOnInit(): void {
        this.getRoles();
        this.dialogRef.disableClose = true;
        this.userForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            username: ['', Validators.email],
            phone: ['', Validators.required],
            dOB: ['', Validators.required],
            image: ['assets/images/user.svg'],
            canlogin: [false],
            isactive: [true],
            role: ['', Validators.required]
        });

        this.btnText = 'SAVE';

        if (this.data) {
            if (this.data.role.name === 'Administrator') {
                this.userForm.get('role').setValue('Administrator');
                this.userForm.get('role').disable({ onlySelf: true });
            }
            this.btnText = 'EDIT';
            this.editstate = true;
            this.id = this.data.data.id;
            this.userForm.patchValue({
                firstName: this.data.data.firstName,
                lastName: this.data.data.lastName,
                address: this.data.data.address,
                username: this.data.data.username,
                phone: this.data.data.phone,
                image: this.data.data.image,
                dOB: this.data.data.dOB,
                canlogin: this.data.data.canlogin,
                isactive: this.data.data.isactive,
                role: this.data.role.name
            });
        }
    }

    getRoles(): void {
        this._useraccountService.getRoles().subscribe(
            result => {
                console.log(result);
                this.roles = result;
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
        const data = this.userForm.value;
        console.log(data);
        // data.role = 

        this._useraccountService.postEmployees(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.userForm.reset();
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
    //                 this.userForm.reset();
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
        const data = this.userForm.value;
        data.id = this.id;
        data.created = this.data.data.created;
        data.userId = this.data.data.userId;
        data.mailSent = this.data.data.mailSent;
        data.accountId = this.data.data.accountId;
        if (this.data.role.name === 'Administrator') {
            data.role = 'Administrator';
        }
        console.log(data);
        this._useraccountService.putEmployees(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });
                    this.userForm.reset();
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
