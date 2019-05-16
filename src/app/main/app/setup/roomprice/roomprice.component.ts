import { ListRoompriceComponent } from './tabs/list-roomprice/list-roomprice.component';
import { NewRoompriceComponent } from './tabs/new-roomprice/new-roomprice.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-roomprice',
  templateUrl: './roomprice.component.html',
  styleUrls: ['./roomprice.component.scss']
})
export class RoompriceComponent implements OnInit {
    selectedIndex: Number = 0;
    @ViewChild(NewRoompriceComponent) newRoomprice;
    @ViewChild(ListRoompriceComponent) AllRoomprice;

    constructor() { }

    ngOnInit(): void {
    }
    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newRoomprice.setForm($event.formdata);
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
         this.AllRoomprice.getAllRoomPrices();
    }
}
