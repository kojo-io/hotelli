import { AmenityService } from './../../amenity.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-list-amenity',
  templateUrl: './list-amenity.component.html',
  styleUrls: ['./list-amenity.component.scss']
})
export class ListAmenityComponent implements OnInit {
    displayedColumns: string[] = [
        'Description',
        'Action'
    ];
    @Output() componentEvent = new EventEmitter<any>();
    amenities: any;
    datasource = new MatTableDataSource<any>();

  constructor(
      private _amenityService: AmenityService
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
      this.getAllAmenities();
  }


    getAmenity(Id: string): void {
        this._amenityService.getAmenity(Id).subscribe(
            result => {
                this.componentEvent.emit({ selectedIndex: 1, formdata: result });
            }
        );
    }

    getAllAmenities(): void {
        this._amenityService.listAmenities().subscribe(
            result => {
                console.log(result);
                if (result != null) {
                    this.amenities = result;
                    this.datasource = new MatTableDataSource<any>(
                        this.amenities
                    );
                    this.datasource.paginator = this.paginator;
                }
            }
        );
    }
}
