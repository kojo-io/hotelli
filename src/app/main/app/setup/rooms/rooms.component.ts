import { ListRoomsComponent } from './tabs/list-rooms/list-rooms.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { NewRoomComponent } from './tabs/new-room/new-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

    selectedIndex: Number = 0;
    @ViewChild(NewRoomComponent) newroom: NewRoomComponent;
    @ViewChild(ListRoomsComponent) Allrooms: ListRoomsComponent;

    constructor() { }

    ngOnInit(): void {
    }

    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newroom.setForm($event.formdata);
        }
        if ($event.reload){
            this.Allrooms.getAllRooms();
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.Allrooms.getAllRooms();
    }
}
