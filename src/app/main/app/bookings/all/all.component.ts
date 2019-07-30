import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BookingService } from '../booking.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss'],
    animations: fuseAnimations
})
export class AllComponent implements OnInit {

    displayedColumns = ['bookId', 'guest', 'contact', 'email', 'room', 'CheckInDateTime', 'CheckOutDateTime', 
    // 'Nights',
    // 'BookDate', 
    'BookType', 'Status'];
    dataSource = new MatTableDataSource<any>();
    bookings: Array<any> = [];
    filterValue: Array<any> = [];
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private _bookService: BookingService,
    ) { }

    ngOnInit(): void {
        this.getBookings();
    }

    getBookings(): void {
        this._bookService.getBookings().subscribe(
            result => {
                this.bookings = result;
                this.dataSource = new MatTableDataSource<any>(this.bookings);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    applyFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.dataSource = new MatTableDataSource<any>();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } else {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

}
