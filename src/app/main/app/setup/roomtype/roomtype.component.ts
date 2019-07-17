import { NewRoomtypeComponent } from './tabs/new-roomtype/new-roomtype.component';
import { ListRoomtypeComponent } from './tabs/list-roomtype/list-roomtype.component';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
    selectedIndex: Number = 0;
    @ViewChild(NewRoomtypeComponent) newRoomtype;
    @ViewChild(ListRoomtypeComponent) AllRoomtype;

  constructor() { }

  ngOnInit(): void {
  }
    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata) {
            this.newRoomtype.setForm($event.formdata);
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.AllRoomtype.getAllRoomTypes();
    }
}
