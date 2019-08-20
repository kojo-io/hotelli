import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../setup/roomtype/tabs/list-roomtype/User';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancelClick(): void {
        this.dialogRef.close('Cancel');
      }
      onConfirmClick(): void {
        this.dialogRef.close('Confirm');
      }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log(this.data);
  }

}
