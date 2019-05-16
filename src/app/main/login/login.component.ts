import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { BaseService } from 'app/utilities/base.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginClick = false;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private router: Router,
        private loginService: LoginService,
        private _fuseSidebarService: FuseSidebarService,
        private _baseService: BaseService
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

        // this._fuseSidebarService.showHideButton(false);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {  
        //  this._baseService.clearSessionData();
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        
    }

    Login(): void {
        // this.loginForm.value
        this.loginClick = true;
        const creds = this.loginForm.value;
        // console.log(creds);
        const loginData = {
            email: creds.email,
            password: creds.password
        };

        const data = 
        this.loginService.login(loginData).subscribe(
            result => {
                // console.log(result);
                // console.log(result);
                if (result) {
                    this.setUserData(result);
                    this.router.navigate(['/app/dashboard']);
                }
                else {
                    this.snackBar.open('Oops error! Please contact your admin', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.loginClick = false;
                }
            },
            error => {
                if (error.status === 401) {
                    this.snackBar.open('Invalid username and password', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.loginClick = false;
                }
                else {
                    this.snackBar.open('Network error! Please try again', 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.loginClick = false;
                }

            }
        );
    }

    setUserData(result: any): void {
        this._baseService.setSessionData(result);
    }
}
