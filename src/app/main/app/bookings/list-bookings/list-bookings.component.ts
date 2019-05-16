import { NewguestComponent } from './tabs/newguest/newguest.component';
import { ListguestComponent } from './tabs/listguest/listguest.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
    selector: 'app-list-bookings',
    templateUrl: './list-bookings.component.html',
    styleUrls: ['./list-bookings.component.scss']
})
export class ListBookingsComponent implements OnInit {
    selectedIndex: Number = 0;
    @ViewChild(NewguestComponent) newguest;
    @ViewChild(ListguestComponent) Allguest;
    constructor() {}

    ngOnInit(): void {
      
    }
    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newguest.setForm($event.formdata);
        }
        if ($event.reload) {
            this.Allguest.getAllGuests();
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.Allguest.getAllGuests();
    }

}
