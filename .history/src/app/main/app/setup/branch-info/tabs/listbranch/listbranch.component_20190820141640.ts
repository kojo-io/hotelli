import { EventEmitter, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { BranchInfoService } from '../../branch-info.service';
import { DialogboxComponent } from 'app/main/app/components/dialogbox/dialogbox.component';

@Component({
    selector: 'app-listbranch',
    templateUrl: './listbranch.component.html',
    styleUrls: ['./listbranch.component.scss']
})
export class ListbranchComponent implements OnInit {
    displayedColumns: string[] = [
        'Name',
        'Address',
        'Contact',
        'Email',
        'Active',
        'Action'
    ];
    @Output() componentEvent = new EventEmitter<any>();
    branches: any;
    datasource = new MatTableDataSource<any>();
    constructor(
        private _branchService: BranchInfoService, public dialog: MatDialog
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
        this.getAllBranches();
    }


    getBranch(Id: string): void {
        this._branchService.getbranch(Id).subscribe(
            result => {
                // console.log(result.branch);
                // this.Child.setForm(result.data);

                this.componentEvent.emit({ selectedIndex: 1, formdata: result.branch });
            }
        );
    }

    deleteBranch(Id: string): void {
        this._branchService.deleteBranch(Id).subscribe(
            result => {
                if (result.status === 100) {
                    this.getAllBranches();
                    alert(result.message);
                }
            }
        );
    }

    getAllBranches(): void {
        this._branchService.listBranches().subscribe(
            result => {
                if (result.branches != null) {
                    this.branches = result.branches;
                    this.datasource = new MatTableDataSource<any>(
                        this.branches
                    );
                    this.datasource.paginator = this.paginator;
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
                this.deleteBranch(elemant.id);
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
