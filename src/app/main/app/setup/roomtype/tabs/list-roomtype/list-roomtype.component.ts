import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RoomtypeService } from '../../roomtype.service';

@Component({
  selector: 'app-list-roomtype',
  templateUrl: './list-roomtype.component.html',
  styleUrls: ['./list-roomtype.component.scss']
})
export class ListRoomtypeComponent implements OnInit {
    displayedColumns: string[] = [
        'Name',
        'Description',
        'Action'
    ];
    @Output() componentEvent = new EventEmitter<any>();
    roomTypes: any;
    datasource = new MatTableDataSource<any>();

  constructor(
      private _roomTypeService: RoomtypeService
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
  ngOnInit(): void {
      this.getAllRoomTypes();
  }

    getRoomType(Id: string): void {
        this._roomTypeService.getRoomType(Id).subscribe(
            result => {
                // console.log(result.branch);
                // this.Child.setForm(result.data);

                this.componentEvent.emit({ selectedIndex: 1, formdata: result });
            }
        );
    }


    getAllRoomTypes(): void {
        this._roomTypeService.listRoomTypes().subscribe(
            result => {
                if (result != null) {
                    this.roomTypes = result;
                    this.datasource = new MatTableDataSource<any>(
                        this.roomTypes
                    );
                    this.datasource.paginator = this.paginator;
                }
            }
        );
    }

}
