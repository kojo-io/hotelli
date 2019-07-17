import { RegisterService } from './register.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseService } from 'app/utilities/base.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    country: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _registerService: RegisterService,
        public snackBar: MatSnackBar,
        private _baseService: BaseService,
        private router: Router,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contact: ['', Validators.required],
            name: ['', Validators.required],
            country: ['', Validators.required],
            region: ['', Validators.required],
            city: ['', Validators.required],
            postalcode: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            terms: [true, Validators.requiredTrue]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });

        this.Country();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    Register(): void{
        const creds = this.registerForm.value;
        console.log(creds);

        this._registerService.register(creds).subscribe(
            result => {
                // console.log(result);
                // console.log(result.data);
                this.setUserData(result);
                if (result) {
                    this.setUserData(result);
                    this._baseService.clearBranchInfo();
                    this.router.navigate(['/app/dashboard']);
                }
                else {
                    this.snackBar.open('Oops error! Please contact your admin', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }
            },
            error => {
                if (error.status === 401) {
                    this.snackBar.open('Invalid username and password', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }
                else {
                    this.snackBar.open('Network error! Please try again', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            }
        );
    }

    setUserData(result: any): void {
        this._baseService.setSessionData(result);
    }

    Country(): void{
        this._registerService.getCountry().subscribe(
            result => {
                console.log(result);
                this.country = result;
            }
        );
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
