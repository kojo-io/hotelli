import { RoomamenityComponent } from './../modal/roomamenity/roomamenity.component';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { RoomService } from '../../room.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {
    displayedColumns: string[] = [
        'subtable',
        'Number',
        'Type',
        'Price',
        'Status',
        'Adults',
        'Children',
        'Description',
        'Active',
        'Action'
    ];

    subcolumns: string[] = [
        'Amenity'
    ];

    @Output() componentEvent = new EventEmitter<any>();
    rooms: any;
    datasource = new MatTableDataSource<any>();
    roomAmenities: any;
  constructor(
      private _roomService: RoomService,
      public modal: MatDialog
  ) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.datasource = new MatTableDataSource<any>();
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        } else {
            this.datasource.filter = filterValue.trim().toLowerCase();
        }
    }

  ngOnInit(): void{
      this.getAllRooms();
  }

  

    getRoom(Id: string): void {
        this._roomService.getRoom(Id).subscribe(
            result => {
                this.componentEvent.emit({ selectedIndex: 1, formdata: result });
            }
        );
    }

    toggleRow(value): void {
        const index = this.datasource.data.indexOf(value);
        this.datasource.data[index].show = !this.datasource.data[index].show;
    }

    getAllRooms(): void {
        this._roomService.listRooms().subscribe(
            result => {
                console.log(result.rooms);
                if (result.rooms != null) {
                    this.rooms = result.rooms;
                    this.datasource = new MatTableDataSource<any>(
                        this.rooms
                    );
                    this.datasource.paginator = this.paginator;
                }
            }
        );
    }

    getRoomAmenities(id): void{
        this._roomService.listRoomAmenities(id).subscribe(
            result => {
                if (result.roomAmenities != null) {
                    this.roomAmenities = result.roomAmenities;
                }
            }
        );
    }

    openModal(id): void{
        const dialogref = this.modal.open(RoomamenityComponent, {
            width: '50%',
            data: id
        });

        dialogref.afterClosed().subscribe(_result => {
            this.getAllRooms();
        });
    }

}
