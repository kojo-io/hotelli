import { UseraccountService } from './useraccount.service';
import { fuseAnimations } from '@fuse/animations';
import { NewuserComponent } from './newuser/newuser.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.scss'],
    animations: fuseAnimations
})
export class UseraccountComponent implements OnInit {
    displayedColumns = ['firstName', 'lastName', 'address', 'email', 'phone', 'canlogin', 'active'];
    dataSource = new MatTableDataSource<any>();
    dialogRef: any;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;


    constructor(
        private _matDialog: MatDialog,
        private _userAccountService: UseraccountService
    ) { }

    ngOnInit(): void {
        this.getEmployees();
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

    getEmployees(): void {
        this._userAccountService.getEmployees().subscribe(
            result => {
                console.log(result);
                this.dataSource = new MatTableDataSource<any>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    edit(elem): void {
        this.dialogRef = this._matDialog.open(NewuserComponent, {
            width: '520px',
            data: elem
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getEmployees();
            }
        );
    }

    newemp(): void {
        this.dialogRef = this._matDialog.open(NewuserComponent, {
            width: '520px'
        });

        this._matDialog.afterAllClosed.subscribe(
            result => {
                this.getEmployees();
            }
        );
    }

    deleteEmployee(Id: string): void {
        this._userAccountService.deleteEmployee(Id).subscribe(
            result => {
                if(result.status === 100){
                    this.getEmployees();
                    alert(result.message);
                }    
            }
        );
    }
}
