import { NewsupplierComponent } from './newsupplier/newsupplier.component';
import { SupplierService } from './supplier.service';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
    animations: fuseAnimations
})
export class SupplierComponent implements OnInit {

    displayedColumns = ['name', 'city', 'address', 'email', 'phone', 'url', 'active'];
    dataSource = new MatTableDataSource<any>();
    dialogRef: any;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private _matDialog: MatDialog,
        private _supplierService: SupplierService,
    ) { }

    ngOnInit(): void {
        this.getSuppliers();
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

    getSuppliers(): void {
        this._supplierService.getSuppliers().subscribe(
            result => {
                console.log(result);
                this.dataSource = new MatTableDataSource<any>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    edit(elem): void {
        this.dialogRef = this._matDialog.open(NewsupplierComponent, {
            width: '500px',
            data: elem
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getSuppliers();
            }
        );
    }

    newsupplier(): void {
        this.dialogRef = this._matDialog.open(NewsupplierComponent, {
            width: '500px'
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getSuppliers();
            }
        );
    }

}
