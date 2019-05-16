import { Component, OnInit, ViewChild } from '@angular/core';
import { NewAmenityComponent } from './tabs/new-amenity/new-amenity.component';
import { ListAmenityComponent } from './tabs/list-amenity/list-amenity.component';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

    selectedIndex: Number = 0;
    @ViewChild(NewAmenityComponent) newAmenity;
    @ViewChild(ListAmenityComponent) AllAmenity;

    constructor() { }

    ngOnInit(): void {
    }
    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newAmenity.setForm($event.formdata);
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.AllAmenity.getAllAmenities();
    }

}
