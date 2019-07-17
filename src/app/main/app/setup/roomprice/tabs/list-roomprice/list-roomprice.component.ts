import { EventEmitter, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RoompriceService } from '../../roomprice.service';

@Component({
  selector: 'app-list-roomprice',
  templateUrl: './list-roomprice.component.html',
  styleUrls: ['./list-roomprice.component.scss']
})
export class ListRoompriceComponent implements OnInit {

    displayedColumns: string[] = [
        'Room Type',
        'Currency',
        'Price',
        'Discount',
        'Action'
    ];
    @Output() componentEvent = new EventEmitter<any>();
    roomPrices: any;
    datasource = new MatTableDataSource<any>();

    constructor(
        private _roomPriceService: RoompriceService
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
        this.getAllRoomPrices();
    }

    getRoomPrice(Id: string): void {
        this._roomPriceService.getRoomPrice(Id).subscribe(
            result => {
                // console.log(result.branch);
                // this.Child.setForm(result.data);

                this.componentEvent.emit({ selectedIndex: 1, formdata: result });
            }
        );
    }


    getAllRoomPrices(): void {
        this._roomPriceService.listRoomPrices().subscribe(
            result => {
                if (result != null) {
                    this.roomPrices = result;
                    this.datasource = new MatTableDataSource<any>(
                        this.roomPrices
                    );
                    this.datasource.paginator = this.paginator;
                }
            }
        );
    }


}
