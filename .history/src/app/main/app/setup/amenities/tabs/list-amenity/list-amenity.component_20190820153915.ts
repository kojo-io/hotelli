import { EventEmitter, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AmenityService } from '../../amenity.service';
import { DialogboxComponent } from 'app/main/app/components/dialogbox/dialogbox.component';

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
      private _amenityService: AmenityService, public dialog: MatDialog
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
    deleteAmenities(Id: string): void {
        this._amenityService.deleteAmenity(Id).subscribe(
            result => {
                if (result.status === 100) {
                    this.getAllAmenities();
                    // alert(result.message);
                }
            }
        );
    }
     // material dialog
     openDialog(elemant): void {
        const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '250px',
            data: elemant,
        });
       
        dialogRef.afterClosed().subscribe(result => {
            
            if (result === 'Confirm') {
                this. deleteAmenities(elemant.id);
                // this.getAllRoomTypes();
                console.log('The dialog was closed');
            }
            else { 
                if (result === 'Cancel') {
                this.dialog.closeAll();
            }
        }
        });
    }
}
