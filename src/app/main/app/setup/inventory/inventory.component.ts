import { InventoryService } from './inventory.service';
import { NewinventoryComponent } from './newinventory/newinventory.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FacilityService } from '../facility/facility.service';
import { InventoryadjustComponent } from '../inventoryadjust/inventoryadjust.component';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    animations: fuseAnimations
})
export class InventoryComponent implements OnInit {

    displayedColumns = ['name', 'descritpion', 'quantity', 'price', 'unitprice', 'collection', 'supplier', 'facility', 'active', 'action'];
    dataSource = new MatTableDataSource<any>();
    dialogRef: any;
    facility: any;
    inventory: any;
    filterValue = [];
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private _matDialog: MatDialog,
        private _inventoryService: InventoryService,
        private _facilityService: FacilityService
    ) { }

    ngOnInit(): void {
        this.getInvent();
        this.getFacili();
    }

    getFacili(): void {
        this._facilityService.getFacilties().subscribe(
            result => {
                this.facility = result;
            }
        );
    }

    getByFacilty(id): void{
        this.filterValue = [];
        this.inventory.forEach(element => {
            if (element.u.facilityId === id){
                this.filterValue.push(element);
            }
        });
        this.dataSource = new MatTableDataSource<any>(this.filterValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getInvent(): void {
        this._inventoryService.getInventory().subscribe(
            result => {
                this.inventory = result;
                this.dataSource = new MatTableDataSource<any>(this.inventory);
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

    istockAdjust(data): any {
        this.dialogRef = this._matDialog.open(InventoryadjustComponent, {
            width: '1000px',
            data: data
        });
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
