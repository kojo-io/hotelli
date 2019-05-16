import { RegisterService } from './../../../register/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BaseService } from 'app/utilities/base.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-hotel',
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
    registerForm: FormGroup;
    country: any;
    hotelId: any;
    private _unsubscribeAll: Subject<any>;
    logo: any;
    constructor(
        private _formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private _baseService: BaseService,
        private router: Router,
        private _registerService: RegisterService
    ) {
        this._unsubscribeAll = new Subject();
     }

    ngOnInit(): void {
        const data = this._baseService.getHotelData();

        this.hotelId = data.id;
        this.registerForm = this._formBuilder.group({
            name: [data.name, Validators.required],
            email: [data.email, [Validators.required, Validators.email]],
            contact: [data.contact, Validators.required],
            country: [data.country, Validators.required],
            region: [data.region, Validators.required],
            city: [data.city, Validators.required],
            postalcode: [data.postalCode, Validators.required],
            address: [data.address, Validators.required],
            established: [data.established, Validators.required],
            website: [data.website],
            isActive: [data.isActive]
        });

        if (data.logo != null)
        {
            this.logo = data.logo;
        }
        else{
            this.logo = 'assets/images/hotel.svg';
        }

        // console.log('data =>', this._baseService.getSesstionData());
        // console.log('form =>', this.registerForm.value);
        this.Country();
        // this.registerForm.get('contact').valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
        //     if (value.length >= 10) {
        //         console.log('max out');
        //         value.length.
        //          this.registerForm.get('contact').setValue(value);
        //     }
        // });
    }

    onBranchlogoChange(event): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.logo = event.target.result;
                console.log(this.logo);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.logo = 'assets/images/hotel.svg';
        console.log(this.logo);
    }


    Country(): void {
        this._registerService.getCountry().subscribe(
            result => {
                this.country = result;
            }
        );
    }

    save(): void{
        const data = this.registerForm.value;
        data.id = this.hotelId;
        data.logo = this.logo;
        this._registerService.Hotel(data).subscribe(results => {
            if (results.status === 'Success'){
                this.snackBar.open(results.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                const ndata = results.data;
                const sessiondata = this._baseService.getSesstionData();
                sessiondata.user = ndata.user;
                sessiondata.hotel = ndata.hotel;
                sessiondata.employ = ndata.employ;

                this._baseService.setSessionData(sessiondata);
                console.log(this._baseService.getSesstionData());
            } else{
                this.snackBar.open(results.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }

        },
        error => {
            this._baseService.clearSessionData();
            this.router.navigate(['/login']);        }
        );
    }
}
