import { Component, OnInit, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface UsersData {
    name: string;
    id: number;
    }

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public element: UsersData) { }

    onCancelClick(): void {
        this.dialogRef.close('Cancel');
      }
      onConfirmClick(): void {
        this.dialogRef.close('Confirm');
      }
  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
