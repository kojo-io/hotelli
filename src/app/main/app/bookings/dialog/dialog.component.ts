import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<DialogComponent>,
      private _bookService: BookingService,
      private _router: Router,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  
  checkOut(): void{
      this._bookService.checkOutUser(this.data.data).subscribe(
          results => {
              if (results.status === 'Success') {
                  this.snackBar.open(results.message, 'dismiss', {
                      duration: 4000,
                      horizontalPosition: 'center',
                      verticalPosition: 'top'
                  });
              } else {
                  this.snackBar.open(results.message, 'dismiss', {
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
