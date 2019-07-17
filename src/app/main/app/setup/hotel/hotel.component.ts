import { BaseService } from 'app/utilities/base.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RegisterService } from 'app/main/register/register.service';

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
            isActive: [data.isActive],
            preCheckOutFee: [data.preCheckOutFee],
            invoicePrefix: [data.invoicePrefix]
        });

        if (data.logo != null)
        {
            this.logo = data.logo;
        }
        else{
            this.logo = 'assets/images/hotel.svg';
        }

        this.Country();
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
        if (isNaN(parseFloat(this.registerForm.get('preCheckOutFee').value))) {
            this.registerForm.get('preCheckOutFee').setValue(0);
        }
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
