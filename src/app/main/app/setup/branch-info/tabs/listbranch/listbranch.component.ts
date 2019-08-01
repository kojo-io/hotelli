import { EventEmitter, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BranchInfoService } from '../../branch-info.service';

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
      private _branchService: BranchInfoService
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
                if(result.status === 100){
                    this.getAllBranches();
                    alert(result.message);
                }    
            }
        );
    }

  getAllBranches(): void{
    this._branchService.listBranches().subscribe(
        result => {
            if (result.branches != null)
            {
                this.branches = result.branches;
                this.datasource = new MatTableDataSource<any>(
                    this.branches
                );
                this.datasource.paginator = this.paginator;
            }
        }
    );
  }

}
