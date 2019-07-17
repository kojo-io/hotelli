import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RoomtypeService } from '../../roomtype.service';

@Component({
  selector: 'app-new-roomtype',
  templateUrl: './new-roomtype.component.html',
  styleUrls: ['./new-roomtype.component.scss']
})
export class NewRoomtypeComponent implements OnInit {
    roomTypeForm: FormGroup;
    editstate: Boolean = false;
    roomTypeId: any;

    @Output() componentEvent = new EventEmitter<any>();

  constructor(
      private _formbuilder: FormBuilder,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      public _roomTypeService: RoomtypeService
  ) { }

  ngOnInit(): void {
      this.roomTypeForm = this._formbuilder.group({
          name: ['', Validators.required],
          description: ['']
      });
  }

    save(): void {
        if (this.editstate === false) {
            this.create();
        }
        else {
            this.edit();
            this.editstate = false;
        }
    }

    create(): void {
        const data = this.roomTypeForm.value;
        // console.log(data);

        this._roomTypeService.createRoomType(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.roomTypeForm.reset();
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

    edit(): void {
        const data = this.roomTypeForm.value;
        // console.log(data);
        data.Id = this.roomTypeId;
        this._roomTypeService.editRoomType(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.roomTypeForm.reset();
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

    setForm(info): void {
        this.editstate = true;
        this.roomTypeForm.reset();
        const branch = info;

        this.roomTypeId = branch.id;

        this.roomTypeForm = this._formbuilder.group({
            name: [branch.name, Validators.required],
            description: [branch.description],
        });
        // console.log(branch);
    }
}
