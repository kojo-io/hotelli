import { BookingService } from '../bookings/booking.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

    route: any;
    invoice: any;
    constructor(
        private _bookService: BookingService,
        private router: Router,
    ) {
        this._bookService.currentRoute.subscribe(
            newroute => (this.route = newroute)
        );

        this._bookService.currentInvoice.subscribe(
            newinvoice => (this.invoice = newinvoice)
        );
        if (this.route === '') {
            this.router.navigate(['/app/dashboard']);
        }
    }

    rooms = new Array<any>();
    ngOnInit(): void {



        this.rooms = [
            {
                number: 1,
                price: 1000,
                tNights: 4,
                total: this.cal(1000, 4)
            }
        ];
    }

    cal(n, s): any {
        return n * s;
    }
}
