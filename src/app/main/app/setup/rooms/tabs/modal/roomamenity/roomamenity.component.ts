import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { RoomService } from '../../../room.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-roomamenity',
  templateUrl: './roomamenity.component.html',
  styleUrls: ['./roomamenity.component.scss']
})
export class RoomamenityComponent implements OnInit {
    @Output() componentEvent = new EventEmitter<any>();
    amenities: any;
    datasource: any;
    selected: any;
    allamenities = new Array<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
        'select',
        'Description'
    ];
    allSelected = new Array<any>();
    selection = new SelectionModel<any>(true, []);
  constructor(
      public dialogRef: MatDialogRef<RoomamenityComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _roomService: RoomService,
      public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void{
      this.getAllAmenities();
  }
    applyFilter(filterValue: string): void {
        if (filterValue === 'All') {
            this.datasource = new MatTableDataSource<any>();
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        } else {
            this.datasource.filter = filterValue.trim().toLowerCase();
        }
    }

    isAllSelected(): any {
        const numSelected = this.selection.selected.length;
        const numRows = this.datasource.data.length;
        return numSelected === numRows;
    }

    itemSelected(element): any {
        this.selection.toggle(element);
        this.selection.isSelected(element);
        this.selected = this.selection.selected;
        console.clear();
        console.log(this.selected);
    }

    masterToggle(): void {
        this.isAllSelected() ? this.selection.clear() : this.datasource.data.forEach(row => this.selection.select(row));
    }

    getAllAmenities(): void {
        this._roomService.listAmenities().subscribe(
            result => {
               // console.log(result);
                if (result != null) {
                    this.amenities = result;
                    this.datasource = new MatTableDataSource<any>(
                        this.amenities
                    );
                    this.datasource.paginator = this.paginator;
                    this.getAllRoomAmenities();

                }
            }
        );
    }

    getAllRoomAmenities(): void{
        this._roomService.listRoomAmenities(this.data.id).subscribe(
            result => {
                if (result.roomAmenities != null) {
                    this.amenities.forEach(item => {
                        result.roomAmenities.forEach(element => {
                            // console.log(element.id + ' ' + item.id);
                            if (element.id === item.id) {
                                this.selection.toggle(item);
                                this.selection.isSelected(item);
                                this.selection.select(item);                            
                            }
                        });
                    });
                    this.datasource = new MatTableDataSource<any>(
                        this.amenities
                    );
                    this.datasource.paginator = this.paginator;
                }
            }
        );
    }

    create(): void {
        this._roomService.createRoomAmenities(this.selected, this.data.id).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                    this.dialogRef.close();
                }
                else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            },
            error => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        );
    }

}
