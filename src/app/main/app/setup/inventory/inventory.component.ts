import { InventoryService } from './inventory.service';
import { NewinventoryComponent } from './newinventory/newinventory.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    animations: fuseAnimations
})
export class InventoryComponent implements OnInit {

    displayedColumns = ['name', 'descritpion', 'quantity', 'price', 'unitprice', 'collection', 'itemcode', 'supplier', 'facility', 'active'];
    dataSource = new MatTableDataSource<any>();
    dialogRef: any;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private _matDialog: MatDialog,
        private _inventoryService: InventoryService
    ) { }

    ngOnInit(): void {
        this.getInvent();
    }

    getInvent(): void {
        this._inventoryService.getInventory().subscribe(
            result => {
                console.log(result);
                this.dataSource = new MatTableDataSource<any>(result);
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

    edit(elem): void {
        this.dialogRef = this._matDialog.open(NewinventoryComponent, {
            width: '1000px',
            data: elem
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getInvent();
            }
        );
    }

    newinventory(): void {
        this.dialogRef = this._matDialog.open(NewinventoryComponent, {
            width: '1000px'
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getInvent();
            }
        );
    }

}
