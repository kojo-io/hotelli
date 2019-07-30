import { BaseService } from 'app/utilities/base.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private messageSource = new BehaviorSubject({ data: null, edit: false });
    currentMessage = this.messageSource.asObservable();

    private routeSource = new BehaviorSubject('');
    currentRoute = this.routeSource.asObservable();

    private invoiceSource = new BehaviorSubject({ data: null });
    currentInvoice = this.invoiceSource.asObservable();

    private receiptSource = new BehaviorSubject('');
    currentReceipt = this.receiptSource.asObservable();

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService
    ) {}

    changeMessage(message): void {
        // console.log(message);
        this.messageSource.next(message);
    }

    checkRoute(route): void {
        this.routeSource.next(route);
    }

    checkInvoice(invoice): void {
        this.invoiceSource.next(invoice);
    }

    checkReceipt(receipt): void {
        this.receiptSource.next(receipt);
    }

    getCountry(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'SetupItems/Country'
        );
    }

    getPayType(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'SetupItems/PaymentType'
        );
    }
    getPayOption(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'SetupItems/PaymentOption'
        );
    }
    getGuests(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() +
                'Guests/Guests'
        );
    }

    getIdentityTypes(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'SetupItems/IdentificationTypes'
        );
    }

    searchForRoom(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() +
                'Rooms/FindRoom/',
            info
        );
    }

    addBooking(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Bookings/Book',
            info
        );
    }

    extendsBooking(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Bookings/ExtendDays',
            info
        );
    }

    editBooking(id, info): any {
        console.log('info', info);
        return this.httpClient.put(
            this.baseService.getBaseUrl() + 'Bookings/Book/' + id,
            info
        );
    }

    getBooking(info): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Bookings/GetSingleBooking/' + info
        );
    }

    getGuest(id): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Guests/Guest/' + id
        );
    }

    getEvents(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() +
                'Bookings/GetBranchBookings/');
    }

    getBookings(): any {
        return this.httpClient.get(
            this.baseService.getBaseUrl() +
            'Bookings/Bookings/');
    }

    addGuest(info): any {
        info.branchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Guests/Guest',
            info
        );
    }

    editGuest(info): any {
        info.branchId = this.baseService.getCurrentBranch().id;
        return this.httpClient.put(
            this.baseService.getBaseUrl() + 'Guests/Guest/' + info.id,
            info
        );
    }

    getGuestCheckins(info): any {
        // GuestReservations
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Guests/GuestCheckins/' + info
        );
    }

    getGuestReservations(info): any {
        // GuestReservations
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Guests/GuestReservations/' + info
        );
    }
   

    getReceipt(id): any {
        // GenerateReceipt
        return this.httpClient.get(
            this.baseService.getBaseUrl() + 'Operations/GuestBill/' + id);
    }

    getPayments(id): any {
        // GenerateReceipt
        return this.httpClient.get(
            this.baseService.getBaseUrl() + '/BookingsPayments/' + id);
    }

    savePayments(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + '/BookingsPayments', info);
    }

    updatePayments(info): any {
        return this.httpClient.put(
            this.baseService.getBaseUrl() + '/BookingsPayments/' + info.id, info);
    }

    checkOutUser(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Bookings/CheckOut/', info);
    }

    FreeCancellation(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Bookings/FreeCancellation/', info);
    }

    PaidCancellation(info): any {
        return this.httpClient.post(
            this.baseService.getBaseUrl() + 'Bookings/PaidCancellation/', info);
    }
}
